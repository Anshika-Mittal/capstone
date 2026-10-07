const WEIGHTS = {
  attention: 0.30,
  memory: 0.30,
  reaction: 0.20,
  pattern: 0.20,
};

export function calculateMemoryScore(memory) {
  if (!memory) return 0;

  const correct = memory.correct ?? 0;
  const total = memory.total ?? 0;

  if (total === 0) return 0;

  return (correct / total) * 100;
}

export function calculateAttentionScore(attention) {
  if (!attention) return 0;

  const correct = attention.correct ?? 0;
  const incorrect = attention.incorrect ?? 0;
  const missed = attention.missed ?? 0;

  const total = correct + incorrect + missed;

  if (total === 0) return 0;

  return (correct / total) * 100;
}

export function calculatePatternScore(pattern) {
  if (!pattern) return 0;

  const correct = pattern.correct ?? 0;
  const total = pattern.total ?? 0;

  if (total === 0) return 0;

  return (correct / total) * 100;
}

export function calculateReactionScore(reaction) {
  if (!reaction) return 0;

  const averageReactionTime =
    reaction.averageReactionTime;

  if (
    averageReactionTime === undefined ||
    averageReactionTime === null
  ) {
    return 0;
  }

  const BEST_TIME = 300;
  const WORST_TIME = 1500;

  if (averageReactionTime <= BEST_TIME) {
    return 100;
  }

  if (averageReactionTime >= WORST_TIME) {
    return 0;
  }

  const score =
    ((WORST_TIME - averageReactionTime) /
      (WORST_TIME - BEST_TIME)) *
    100;

  return Math.round(score);
}

export function calculateCognitiveScore(results) {
  const memoryScore =
    calculateMemoryScore(results.memory);

  const attentionScore =
    calculateAttentionScore(results.attention);

  const reactionScore =
    calculateReactionScore(results.reactionTime);

  const patternScore =
    calculatePatternScore(results.pattern);

  const overallScore =
    memoryScore * WEIGHTS.memory +
    attentionScore * WEIGHTS.attention +
    reactionScore * WEIGHTS.reaction +
    patternScore * WEIGHTS.pattern;

  return {
    memory: Math.round(memoryScore),
    attention: Math.round(attentionScore),
    reaction: Math.round(reactionScore),
    pattern: Math.round(patternScore),
    overall: Math.round(overallScore),
  };
}

export function getCognitiveLevel(score) {
  if (score >= 85) {
    return "Excellent";
  }

  if (score >= 70) {
    return "Good";
  }

  if (score >= 50) {
    return "Moderate";
  }

  return "Needs Improvement";
}