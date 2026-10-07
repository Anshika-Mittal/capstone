import React, { useState } from "react";

import MemoryExercise from "../components/cognitive/MemoryExercise";
import AttentionExercise from "../components/cognitive/AttentionExercise";
import ReactionTimeExercise from "../components/cognitive/ReactionTimeExercise";
import PatternExercise from "../components/cognitive/PatternExercise";
import { submitAssessment } from "../services/cognitiveApi";
import {
  calculateCognitiveScore,
} from "../utils/cognitiveScore";
import CognitiveScore
  from "../components/cognitive/CognitiveScore";
const CognitiveAssessment = () => {
  /*
   * Stores the result of every completed exercise.
   */
  const [results, setResults] = useState({
    memory: null,
    attention: null,
    reactionTime: null,
    pattern: null,
  });

  const [cognitiveScore, setCognitiveScore] =
  useState(null);

  /*
   * Controls which exercise is currently displayed.
   */
  const [currentExercise, setCurrentExercise] =
    useState("memory");

  /*
   * Memory completed
   */
  const handleMemoryComplete = (result) => {
    setResults((previous) => ({
      ...previous,
      memory: result,
    }));

    setCurrentExercise("attention");
  };

  /*
   * Attention completed
   */
  const handleAttentionComplete = (result) => {
    setResults((previous) => ({
      ...previous,
      attention: result,
    }));

    setCurrentExercise("reactionTime");
  };

  /*
   * Reaction Time completed
   */
  const handleReactionComplete = (result) => {
    setResults((previous) => ({
      ...previous,
      reactionTime: result,
    }));

    setCurrentExercise("pattern");
  };

  const handleSubmitAssessment = async () => {
    try {
      const payload = {
  results,
  cognitiveScore,
};

const response = await submitAssessment(payload);

    console.log(
      "Assessment submitted successfully:",
      response
    );
    } catch (error) {
      console.error(
        "Assessment submission failed:",
        error
      );
    }
  };
  /*
   * Pattern Recognition completed
   */
  const handlePatternComplete = (patternResult) => {
  const updatedResults = {
    ...results,
    pattern: patternResult,
  };

  setResults(updatedResults);

  const score =
    calculateCognitiveScore(updatedResults);

  setCognitiveScore(score);

  setCurrentExercise("summary");
};

  /*
   * Summary screen
   */
  if (currentExercise === "summary") {
  const memoryResult = results.memory;
  const attentionResult = results.attention;
  const reactionResult = results.reactionTime;
  const patternResult = results.pattern;

  return (
    <div className="cognitive-assessment">
      <div className="assessment-summary">

        <h1>Cognitive Assessment Complete</h1>

        <p className="assessment-summary-description">
          Your cognitive assessment has been completed.
        </p>

        {/* COGNITIVE SCORE */}
        <CognitiveScore
          score={cognitiveScore}
        />

        {/* MEMORY */}
        <div className="summary-section">
          <h2>Memory</h2>

          {/* your existing code */}
        </div>

        {/* ATTENTION */}
        <div className="summary-section">
          <h2>Attention</h2>

          {/* your existing code */}
        </div>

        {/* REACTION TIME */}
        <div className="summary-section">
          <h2>Reaction Time</h2>

          {/* your existing code */}
        </div>

        {/* PATTERN */}
        <div className="summary-section">
          <h2>Pattern Recognition</h2>

          {/* your existing code */}
        </div>

        {/* DEBUG */}
        <div className="assessment-debug">
          <h2>Assessment Data</h2>

          <pre>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>

        <button onClick={handleSubmitAssessment}>
          Submit Assessment
        </button>

      </div>
    </div>
  );
}

  /*
   * Main assessment controller.
   *
   * Only ONE exercise is rendered at a time.
   */
  return (
    <div className="cognitive-assessment">
      {currentExercise === "memory" && (
        <MemoryExercise
          onComplete={handleMemoryComplete}
        />
      )}

      {currentExercise === "attention" && (
        <AttentionExercise
          onComplete={handleAttentionComplete}
        />
      )}

      {currentExercise === "reactionTime" && (
        <ReactionTimeExercise
          onComplete={handleReactionComplete}
        />
      )}

      {currentExercise === "pattern" && (
        <PatternExercise
          onComplete={handlePatternComplete}
        />
      )}
    </div>
  );
};

export default CognitiveAssessment;