import React, { useEffect, useState } from "react";

const stimuli = [
  "circle",
  "triangle",
  "square",
  "circle",
  "triangle",
  "circle",
  "square",
  "triangle",
];

const STIMULUS_DURATION = 1500;

const AttentionExercise = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [stimulusTime, setStimulusTime] = useState(null);
  const [phase, setPhase] = useState("running");

  /*
   * Record the exact time whenever a new stimulus appears.
   */
  useEffect(() => {
    if (currentIndex < stimuli.length && phase === "running") {
      setStimulusTime(performance.now());
    }
  }, [currentIndex, phase]);

  /*
   * Automatically move to the next stimulus after 1500 ms.
   *
   * If the current stimulus is a circle and the user did not click,
   * count it as a missed target.
   */
  useEffect(() => {
    if (currentIndex >= stimuli.length || phase !== "running") {
      return;
    }

    const timer = setTimeout(() => {
      if (stimuli[currentIndex] === "circle") {
        setMissed((previous) => previous + 1);
      }

      moveToNextStimulus();
    }, STIMULUS_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, phase]);

  /*
   * Move to the next stimulus.
   */
  const moveToNextStimulus = () => {
    if (currentIndex === stimuli.length - 1) {
      const finalResult = {
      exercise: "attention",
      correct,
      incorrect,
      missed,
      accuracy,
      reactionTimes,
      averageReactionTime,
    };

    onComplete(finalResult);
    } else {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  /*
   * Handle user's click.
   *
   * Clicking a circle:
   *   -> correct
   *   -> record reaction time
   *
   * Clicking triangle/square:
   *   -> incorrect
   */
  const handleClick = () => {
    if (phase !== "running" || stimulusTime === null) {
      return;
    }

    const responseTime = performance.now();

    const reactionTime = responseTime - stimulusTime;

    const currentStimulus = stimuli[currentIndex];

    if (currentStimulus === "circle") {
      setCorrect((previous) => previous + 1);

      setReactionTimes((previous) => [
        ...previous,
        reactionTime,
      ]);
    } else {
      setIncorrect((previous) => previous + 1);
    }

    moveToNextStimulus();
  };

  /*
   * Calculate final result values.
   */
  const totalTargets = stimuli.filter(
    (stimulus) => stimulus === "circle"
  ).length;

  const accuracy =
    totalTargets > 0
      ? (correct / totalTargets) * 100
      : 0;

  const averageReactionTime =
    reactionTimes.length > 0
      ? reactionTimes.reduce(
          (sum, value) => sum + value,
          0
        ) / reactionTimes.length
      : 0;

  const attentionResult = {
    exercise: "attention",
    correct,
    incorrect,
    missed,
    accuracy,
    reactionTimes,
    averageReactionTime,
  };

  /*
   * Get a visual representation of the current stimulus.
   */
  const renderStimulus = () => {
    const currentStimulus = stimuli[currentIndex];

    if (currentStimulus === "circle") {
      return <div className="attention-shape circle" />;
    }

    if (currentStimulus === "triangle") {
      return <div className="attention-shape triangle" />;
    }

    if (currentStimulus === "square") {
      return <div className="attention-shape square" />;
    }

    return null;
  };

  /*
   * Result screen.
   */
  if (phase === "result") {
    return (
      <div className="attention-exercise">
        <div className="attention-result">
          <h2>Attention Exercise Complete</h2>

          <div className="attention-result-item">
            <span>Correct</span>
            <strong>{attentionResult.correct}</strong>
          </div>

          <div className="attention-result-item">
            <span>Incorrect</span>
            <strong>{attentionResult.incorrect}</strong>
          </div>

          <div className="attention-result-item">
            <span>Missed</span>
            <strong>{attentionResult.missed}</strong>
          </div>

          <div className="attention-result-item">
            <span>Accuracy</span>
            <strong>
              {attentionResult.accuracy.toFixed(1)}%
            </strong>
          </div>

          <div className="attention-result-item">
            <span>Average Reaction Time</span>
            <strong>
              {attentionResult.averageReactionTime > 0
                ? `${attentionResult.averageReactionTime.toFixed(
                    0
                  )} ms`
                : "N/A"}
            </strong>
          </div>

          <div className="attention-summary">
            <p>
              You correctly responded to{" "}
              <strong>{correct}</strong> out of{" "}
              <strong>{totalTargets}</strong> target stimuli.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Exercise screen.
   */
  return (
    <div className="attention-exercise">
      <div className="attention-header">
        <h2>Attention Exercise</h2>

        <p>
          Click whenever you see a circle.
        </p>

        <div className="attention-progress">
          Stimulus {currentIndex + 1} of {stimuli.length}
        </div>
      </div>

      <div className="attention-stimulus-container">
        {renderStimulus()}
      </div>

      <button
        type="button"
        className="attention-click-button"
        onClick={handleClick}
      >
        CLICK
      </button>

      <div className="attention-live-stats">
        <div>
          <span>Correct</span>
          <strong>{correct}</strong>
        </div>

        <div>
          <span>Incorrect</span>
          <strong>{incorrect}</strong>
        </div>

        <div>
          <span>Missed</span>
          <strong>{missed}</strong>
        </div>
      </div>
    </div>
  );
};
// onComplete(attentionResult);
export default AttentionExercise;