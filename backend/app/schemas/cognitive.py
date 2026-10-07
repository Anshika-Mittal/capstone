from typing import List
from typing import Any, Dict
from pydantic import BaseModel


class MemoryResult(BaseModel):
    exercise: str
    correct: int
    total: int
    accuracy: float
    falsePositives: int
    missed: int
    recallTime: float


class AttentionResult(BaseModel):
    exercise: str
    correct: int
    incorrect: int
    missed: int
    accuracy: float
    reactionTimes: List[float]
    averageReactionTime: float


class ReactionTimeResult(BaseModel):
    exercise: str
    trials: List[float]
    averageReactionTime: float


class PatternResult(BaseModel):
    exercise: str
    correct: int
    total: int
    accuracy: float
    completionTime: float


class CognitiveAssessment(BaseModel):
    memory: MemoryResult
    attention: AttentionResult
    reactionTime: ReactionTimeResult
    pattern: PatternResult

class CognitiveSession(BaseModel):
    results: Dict[str, Any]
    cognitiveScore: Dict[str, float]