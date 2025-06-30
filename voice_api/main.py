from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    AutoModelForSpeechSeq2Seq,
    AutoProcessor,
    pipeline,
)
import torch
import torch.nn.functional as F
import os
import tempfile

app = FastAPI(
    title="Sentiment & Speech Analysis API",
    description="Upload audio or enter text to get emotion prediction",
    version="1.0.0"
)

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Load Sentiment Model
# ------------------------
model_name = "lewiswatson/distilbert-base-uncased-finetuned-emotion"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# ------------------------
# Load Whisper Speech Model
# ------------------------
device = 0 if torch.cuda.is_available() else -1
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

whisper_model_id = "openai/whisper-small"
whisper_model = AutoModelForSpeechSeq2Seq.from_pretrained(
    whisper_model_id,
    torch_dtype=torch_dtype,
    low_cpu_mem_usage=True,
    use_safetensors=True
).to("cuda" if device == 0 else "cpu")

processor = AutoProcessor.from_pretrained(whisper_model_id)

whisper_pipe = pipeline(
    "automatic-speech-recognition",
    model=whisper_model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    return_timestamps=True,
    chunk_length_s=30,
    torch_dtype=torch_dtype,
    device=device,
)

# ------------------------
# /predict Endpoint
# ------------------------

class TextInput(BaseModel):
    text: str

@app.post("/predict", summary="Predict sentiment from text")
def predict_emotion(input_text: TextInput):
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

# ------------------------
# /transcribe-audio Endpoint
# ------------------------

@app.post("/transcribe-audio", summary="Transcribe uploaded audio file")
async def transcribe_audio(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".mp3", ".wav", ".m4a", ".ogg", ".webm")):
        raise HTTPException(status_code=400, detail="Invalid audio file format.")

    try:
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_audio:
            temp_audio.write(await file.read())
            temp_path = temp_audio.name

        result = whisper_pipe(temp_path)
        os.remove(temp_path)

        transcription = result.get("text", "")

        return {
            "file_name": file.filename,
            "transcription": transcription.strip()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
