from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# Model setup
model_name = "rb05751/toxic_speech_detector"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.eval()

# Label mapping
label_map = {
    0: "Non-Toxic",
    1: "Toxic"
}

# FastAPI app setup
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class TextRequest(BaseModel):
    text: str

# Toxicity Analysis Endpoint
@app.post("/analyze-toxicity")
async def analyze_toxicity(payload: TextRequest):
    text = payload.text.strip()
    if not text:
        return {"error": "Empty input text."}

    # Tokenize and run model
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)

    # Get probabilities
    probs = F.softmax(outputs.logits, dim=1)[0]
    prediction = torch.argmax(probs).item()
    confidence = round(probs[prediction].item() * 100, 2)
    toxicity_score = round(probs[1].item() * 100, 2)

    return {
        "label": label_map[prediction],
        "confidence": confidence,
        "toxicity_score": toxicity_score,
        "probabilities": {
            "non_toxic": round(probs[0].item() * 100, 2),
            "toxic": round(probs[1].item() * 100, 2)
        }
    }
