import React, {
  useEffect,
  useRef,
  useState,
} from "react";

const TOTAL_TRIALS = 5;
const MIN_DELAY = 1000;
const MAX_DELAY = 3000;

const ReactionTimeExercise = ({ onComplete }) => {
  const [trial, setTrial] = useState(1);
  const [phase, setPhase] = useState("waiting");
  const [stimulusTime, setStimulusTime] =
    useState(null);
  const [trials, setTrials] = useState([]);
  const [falseStarts, setFalseStarts] =
    useState(0);
  const [finalResult, setFinalResult] =
    useState(null);

  const timerRef = useRef(null);

  /*
   * Start a new trial.
   */
  useEffect(() => {
    if (phase !== "waiting") {
      return;
    }

    const delay =
      Math.floor(
        Math.random() *
          (MAX_DELAY - MIN_DELAY + 1)
      ) + MIN_DELAY;

    timerRef.current = setTimeout(() => {
      const time = performance.now();

      setStimulusTime(time);
      setPhase("ready");
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [trial, phase]);

  /*
   * Handle user's click.
   */
  const handleClick = () => {
    /*
     * False start.
     */
    if (phase === "waiting") {
      setFalseStarts(
        (previous) => previous + 1
      );

      return;
    }

    /*
     * Ignore clicks after completion.
     */
    if (phase === "result") {
      return;
    }

    /*
     * Valid reaction.
     */
    if (
      phase === "ready" &&
      stimulusTime !== null
    ) {
      const responseTime =
        performance.now();

      const reactionTime =
        responseTime - stimulusTime;

      const updatedTrials = [
        ...trials,
        reactionTime,
      ];

      setTrials(updatedTrials);
      setStimulusTime(null);

      /*
       * Final trial.
       */
      if (trial === TOTAL_TRIALS) {
        const averageReactionTime =
          updatedTrials.reduce(
            (sum, value) => sum + value,
            0
          ) / updatedTrials.length;

        const reactionTimeResult = {
          exercise: "reaction_time",

          trials: updatedTrials,

          averageReactionTime:
            Number(
              averageReactionTime.toFixed(2)
            ),

          falseStarts,
        };

        setFinalResult(
          reactionTimeResult
        );

        setPhase("result");

        /*
         * IMPORTANT:
         * This is called from the click handler,
         * NOT during rendering.
         */
        onComplete(
          reactionTimeResult
        );

        return;
      }

      /*
       * Next trial.
       */
      setTrial(
        (previous) => previous + 1
      );

      setPhase("waiting");
    }
  };

  /*
   * Result screen.
   */
  if (phase === "result") {
    return (
      <div className="reaction-time-exercise">
        <div className="reaction-time-result">

          <h2>
            Reaction Time Complete
          </h2>

          <div className="reaction-time-average">
            <span>
              Average Reaction Time
            </span>

            <strong>
              {
                finalResult
                  ?.averageReactionTime
              }{" "}
              ms
            </strong>
          </div>

          <div className="reaction-time-trials">
            <h3>Trial Results</h3>

            {finalResult?.trials.map(
              (reactionTime, index) => (
                <div
                  className="reaction-time-trial"
                  key={index}
                >
                  <span>
                    Trial {index + 1}
                  </span>

                  <strong>
                    {reactionTime.toFixed(2)} ms
                  </strong>
                </div>
              )
            )}
          </div>

          <div className="reaction-time-false-starts">
            <span>
              False Starts
            </span>

            <strong>
              {finalResult?.falseStarts}
            </strong>
          </div>

        </div>
      </div>
    );
  }

  /*
   * Main exercise screen.
   */
  return (
    <div className="reaction-time-exercise">

      <div className="reaction-time-header">
        <h2>
          Reaction Time Exercise
        </h2>

        <p>
          Trial {trial} of {TOTAL_TRIALS}
        </p>
      </div>

      <div className="reaction-time-stimulus">

        {phase === "waiting" && (
          <div className="reaction-time-message waiting">
            WAIT...
          </div>
        )}

        {phase === "ready" && (
          <div className="reaction-time-message ready">
            CLICK!
          </div>
        )}

      </div>

      <button
        type="button"
        className="reaction-time-button"
        onClick={handleClick}
      >
        CLICK
      </button>

      <div className="reaction-time-info">

        <p>
          Click as quickly as possible when
          <strong> CLICK! </strong>
          appears.
        </p>

        <p>
          False starts:{" "}
          <strong>
            {falseStarts}
          </strong>
        </p>

      </div>

    </div>
  );
};

export default ReactionTimeExercise;