# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# Initialize FastAPI
app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_name = "lewiswatson/distilbert-base-uncased-finetuned-emotion"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Request model
class TextInput(BaseModel):
    text: str

@app.post("/predict")
def get_emotion(input_text: TextInput):
    if not input_text.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    inputs = tokenizer(input_text.text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)

    predicted_class_id = torch.argmax(probs, dim=1).item()
    predicted_label = model.config.id2label[predicted_class_id]
    emotion_scores = {
        model.config.id2label[i]: round(prob.item(), 4)
        for i, prob in enumerate(probs[0])
    }

    return {
        "text": input_text.text,
        "predicted_emotion": predicted_label,
        "emotion_scores": emotion_scores
    }
