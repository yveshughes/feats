from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "healthy", "service": "FEATS Analysis API"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    # Read image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    
    # Placeholder for FEATS analysis
    result = {
        "fluency": 0.8,
        "emotional_range": 0.7,
        "authenticity": 0.9,
        "technical_quality": 0.6,
        "style": 0.8
    }
    
    return result