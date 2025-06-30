from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; replace with domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Ideally, store your API key in an environment variable
API_KEY = os.getenv("TANBIH_API_KEY", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmF0aGFtZXNod29ya3MyNDdAZ21haWwuY29tIiwiaWF0IjoxNzUxMTMyNDM0LCJuYmYiOjE3NTExMzI0MzQsImp0aSI6ImZkODcxN2ZkLTI5ZDQtNDE3Ny05MThkLTZkZmM4NmRiZTI4OSIsImV4cCI6MTc1MzcyNDQzNCwidHlwZSI6ImFjY2VzcyIsImZyZXNoIjpmYWxzZSwicm9sZSI6InVzZXIiLCJuYW1lIjoiUHJhdGhhbWVzaCBQYXRpbCIsInVzZXJfaWQiOjE4fQ.9ZNWhWq8Ij8RUOz9CtrHfJejjTZwa5sxbgHQB7KEwZc")

class InputText(BaseModel):
    data: str

@app.post("/detect_propaganda")
def detect_propaganda(input_text: InputText):
    url = "https://apihub.tanbih.org/api/v1/propaganda-detection/en"
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    response = requests.post(url, headers=headers, json=input_text.dict())
    return response.json()
