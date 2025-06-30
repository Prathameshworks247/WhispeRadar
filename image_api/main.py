from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import easyocr
import cv2
import numpy as np
import uvicorn

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(['en'], gpu=True)  # Enable GPU

@app.post("/extract-text/")
async def extract_text(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        np_arr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img is None:
            return JSONResponse(content={"error": "Invalid image"}, status_code=400)

        results = reader.readtext(img)

        # Convert results to serializable format
        cleaned_results = []
        for (bbox, text, prob) in results:
            bbox = [tuple(map(float, point)) for point in bbox]  # Convert points to float
            cleaned_results.append({
                "bbox": bbox,
                "text": text,
                "confidence": float(prob)
            })

        extracted_text = " ".join([res["text"] for res in cleaned_results])

        return {"extracted_text": extracted_text, "details": cleaned_results}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
