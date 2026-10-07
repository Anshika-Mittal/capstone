from fastapi import APIRouter

from ..schemas.cognitive import CognitiveAssessment
from ..services.cognitive_scoring import (
    calculate_overall_score,
)


router = APIRouter(
    prefix="/api/cognitive",
    tags=["Cognitive Assessment"],
)


@router.post("/session")
def submit_cognitive_session(
    assessment: CognitiveAssessment,
):
    overall_score = calculate_overall_score(
        assessment
    )

    return {
        "message": "Assessment received successfully",
        "overallScore": overall_score,
        "assessment": assessment,
    }