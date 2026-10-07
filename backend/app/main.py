from typing import Any, Dict
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.cognitive import router as cognitive_router
from .api.neurofeedback import router as neurofeedback_router

class CognitiveSession(BaseModel):
    results: Dict[str, Any]
    cognitiveScore: Dict[str, float]


app = FastAPI(
    title="EEGRehab Cognitive Assessment API",
    description="Backend API for cognitive rehabilitation assessment",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(cognitive_router)


@app.get("/")
def root():
    return {
        "message": "EEGRehab Cognitive Assessment API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.post("/api/cognitive/session")
async def submit_cognitive_session(
    session: CognitiveSession
):
    print("Received cognitive session:")
    print(session)

    return {
        "success": True,
        "cognitiveScore": session.cognitiveScore
    }

app.include_router(
    neurofeedback_router
)