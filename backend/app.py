from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, re, requests
from newspaper import Article
from dotenv import load_dotenv

from langchain.schema import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA

import nltk
import spacy

# -------------------- Setup --------------------
load_dotenv()
nltk.download("punkt")
nlp = spacy.load("en_core_web_sm")

app = FastAPI(title="Unified FactCheck API")

# Allow all origins during development (restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; replace with domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Config --------------------
NEWS_DATA_API = os.getenv("NEWS_DATA_API")

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
llm = ChatOllama(model="gemma2:2b")

prompt_template = PromptTemplate.from_template("""
You are a professional fact-checking assistant. Your task is to analyze a claim and assess its truthfulness by combining your own up-to-date knowledge with the provided context from multiple news sources.

You must use both:
•⁠  ⁠Your general world knowledge and understanding of current events.
•⁠  ⁠The content provided in the "Context" section.

---

Claim:
"{question}"

Context:
{context}

---

Respond in exactly the following structured format without adding extra text or labels. Each field must be on a new line, and no field should contain information from other fields.

---

Verdict: [True or False]

Explanation: A clear, neutral, 7-8 line explanation of why the claim is true or false, based on both your own knowledge and the context provided. Do NOT mention specific sources, percentages, or URLs here. Do NOT include the Credibility Score here.

Source: A single direct link to the most relevant article from context or your knowledge(only the URL, no title or description).

Credibility_Score: A number from 0 to 100 representing your confidence in the credibility of the source (just the number, no % sign, no explanation).
""")

# -------------------- Request Schema --------------------
class UnifiedFactCheckRequest(BaseModel):
    url: str | None = None
    text: str | None = None

# -------------------- Utility Functions --------------------
def url_to_news_text(news_url: str) -> str:
    article = Article(news_url)
    article.download()
    article.parse()
    article.nlp()
    return f"{article.title}"

def get_new_data(query: str):
    url = f"https://newsdata.io/api/1/latest?apikey={NEWS_DATA_API}&q={query}"
    response = requests.get(url)
    return response.json()

def json_to_documents(json_data):
    documents = []
    for article in json_data.get("results", []):
        if not isinstance(article, dict):
            continue
        if article.get("language", "").lower() != "english":
            continue
        title = article.get("title", "")
        description = article.get("description", "")
        link = article.get("link", "")
        content = f"Title: {title}\nDescription: {description}\nSource: {link}"
        documents.append(Document(page_content=content, metadata={"source": link}))
    return documents

def top_4_keywords_string(sentence: str) -> str:
    sentence = re.sub(r"[’‘“”]", "'", sentence)
    doc = nlp(sentence)
    keywords = [
        token.lemma_.lower()
        for token in doc
        if token.pos_ in {"PROPN", "NOUN", "ADJ"}
        and not token.is_stop
        and token.is_alpha
    ]
    seen = set()
    unique_keywords = []
    for word in keywords:
        if word not in seen:
            seen.add(word)
            unique_keywords.append(word)
    return " ".join(unique_keywords[:4])

def parse_response(text: str):
    lines = text.strip().splitlines()
    verdict, explanation, source, credibility_score = "Uncertain", "", "", 0
    collecting_explanation = False

    for line in lines:
        lower = line.lower().strip()
        if lower.startswith("verdict:"):
            verdict = line.split(":", 1)[1].strip()
            collecting_explanation = False
        elif lower.startswith("explanation:"):
            explanation = line.split(":", 1)[1].strip()
            collecting_explanation = True
        elif lower.startswith("source:"):
            source = line.split(":", 1)[1].strip()
            collecting_explanation = False
        elif lower.startswith("credibility_score:"):
            try:
                credibility_score = int(line.split(":", 1)[1].strip())
            except:
                credibility_score = 0
            collecting_explanation = False
        elif collecting_explanation:
            explanation += " " + line.strip()

    return {
        "verdict": verdict,
        "explanation": explanation.strip(),
        "source": source,
        "credibility_score": credibility_score
    }

# -------------------- Main Endpoint --------------------
@app.post("/factcheck")
async def unified_fact_check(request: UnifiedFactCheckRequest):
    try:
        # Step 1: Extract content
        if request.url and request.url.startswith("http"):
            news_text = url_to_news_text(request.url)
        elif request.text:
            news_text = request.text
        else:
            return {"error": "You must provide either a valid 'url' (starting with http) or plain 'text'."}


        # Step 2: Get keywords and retrieve articles
        query = top_4_keywords_string(news_text)
        raw_news = get_new_data(query)
        docs = json_to_documents(raw_news)

        if not docs:
            return {"error": "No relevant news articles found"}

        # Step 3: RAG Chain with FAISS
        vectorstore = FAISS.from_documents(docs, embeddings)
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            return_source_documents=True,
            chain_type="stuff",
            chain_type_kwargs={"prompt": prompt_template}
        )

        response = qa_chain.invoke({"query": news_text})
        result = parse_response(response["result"])

        return result

    except Exception as e:
        return {"error": str(e)}
