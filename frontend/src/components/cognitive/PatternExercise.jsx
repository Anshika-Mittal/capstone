import React, { useState } from "react";


/*
 * Pattern question bank
 *
 * Add Question 4 and Question 5 here later.
 */
const patterns = [
  {
    id: 1,
    sequence: [2, 4, 8, 16],
    options: [18, 24, 32, 36],
    answer: 32,
  },
  {
    id: 2,
    sequence: [5, 10, 20, 40],
    options: [50, 60, 70, 80],
    answer: 80,
  },
  {
    id: 3,
    sequence: [3, 6, 12, 24],
    options: [36, 42, 48, 50],
    answer: 48,
  },

  // Add more questions here:
  //
  // {
  //   id: 4,
  //   sequence: [...],
  //   options: [...],
  //   answer: ...,
  // },
  //
  // {
  //   id: 5,
  //   sequence: [...],
  //   options: [...],
  //   answer: ...,
  // },
];

const PatternExercise = ({ onComplete }) => {
  /*
   * Index of the question currently displayed.
   */
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  /*
   * Stores the response for every completed question.
   */
  const [answers, setAnswers] = useState([]);

  /*
   * Time at which the current question started.
   *
   * performance.now() gives a high-resolution timestamp.
   */
  const [questionStartTime, setQuestionStartTime] =
    useState(performance.now());

  /*
   * Result phase after all questions have been answered.
   */
  const [phase, setPhase] = useState("running");

  const [finalResult, setFinalResult] =
  useState(null);

  /*
   * Safety check in case the question bank is empty.
   */
  if (patterns.length === 0) {
    return (
      <div className="pattern-exercise">
        <h2>No pattern questions available.</h2>
      </div>
    );
  }

  /*
   * Current question.
   */
  const question = patterns[currentQuestion];

  /*
   * Handle the user's selected answer.
   */
  const handleAnswer = (selectedAnswer) => {
  /*
   * Measure how long the user took to answer.
   */
  const completionTime =
    (performance.now() - questionStartTime) / 1000;

  /*
   * Check whether the selected answer is correct.
   */
  const correct =
    selectedAnswer === question.answer;

  /*
   * Create the complete answer record.
   */
  const answerRecord = {
    questionId: question.id,
    answer: selectedAnswer,
    correctAnswer: question.answer,
    correct,
    completionTime,
  };

  /*
   * IMPORTANT:
   * Use updatedAnswers because React state
   * has not updated yet after setAnswers().
   */
  const updatedAnswers = [
    ...answers,
    answerRecord,
  ];

  setAnswers(updatedAnswers);

  /*
   * Check whether this was the final question.
   */
  if (currentQuestion === patterns.length - 1) {
    /*
     * Calculate final statistics using
     * updatedAnswers.
     */
    const finalCorrectCount =
      updatedAnswers.filter(
        (answer) => answer.correct
      ).length;

    const finalAccuracy =
      patterns.length > 0
        ? (finalCorrectCount / patterns.length) *
          100
        : 0;

    const finalCompletionTime =
      updatedAnswers.reduce(
        (sum, answer) =>
          sum + answer.completionTime,
        0
      );

    /*
     * Create the final result.
     */
    const finalPatternResult = {
      exercise: "pattern",
      correct: finalCorrectCount,
      total: patterns.length,
      accuracy: finalAccuracy,
      completionTime: Number(
        finalCompletionTime.toFixed(2)
      ),
      answers: updatedAnswers,
    };

    setFinalResult(finalPatternResult);

setPhase("result");

onComplete(finalPatternResult);

return;
  }

  /*
   * Move to the next question.
   */
  setCurrentQuestion(
    (previous) => previous + 1
  );

  /*
   * Start timing the new question.
   */
  setQuestionStartTime(
    performance.now()
  );
};

  /*
   * Result screen
   */
  if (phase === "result") {
  return (
    <div className="pattern-exercise">
      <div className="pattern-result">

        <h2>
          Pattern Recognition Complete
        </h2>

        <div className="pattern-result-summary">

          <div className="pattern-result-item">
            <span>Correct</span>

            <strong>
              {finalResult?.correct}
            </strong>
          </div>

          <div className="pattern-result-item">
            <span>Total Questions</span>

            <strong>
              {finalResult?.total}
            </strong>
          </div>

          <div className="pattern-result-item">
            <span>Accuracy</span>

            <strong>
              {finalResult?.accuracy.toFixed(1)}%
            </strong>
          </div>

          <div className="pattern-result-item">
            <span>
              Total Completion Time
            </span>

            <strong>
              {finalResult?.completionTime.toFixed(
                2
              )}{" "}
              s
            </strong>
          </div>

        </div>

        <div className="pattern-answer-details">

          <h3>Question Details</h3>

          {finalResult?.answers.map(
            (answer, index) => (
              <div
                className="pattern-answer-row"
                key={answer.questionId}
              >
                <span>
                  Question {index + 1}
                </span>

                <span>
                  Your answer:{" "}
                  <strong>
                    {answer.answer}
                  </strong>
                </span>

                <span>
                  Correct answer:{" "}
                  <strong>
                    {answer.correctAnswer}
                  </strong>
                </span>

                <span>
                  {answer.correct
                    ? "Correct"
                    : "Incorrect"}
                </span>

                <span>
                  {answer.completionTime.toFixed(
                    2
                  )}{" "}
                  s
                </span>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}

  /*
   * Question screen
   */
  return (
    <div className="pattern-exercise">
      <div className="pattern-header">
        <h2>Pattern Recognition</h2>

        <p>
          Find the number that logically
          continues the pattern.
        </p>

        <div className="pattern-progress">
          Question {currentQuestion + 1} of{" "}
          {patterns.length}
        </div>
      </div>

      <div className="pattern-question">
        <h3>What comes next?</h3>

        <div className="pattern-sequence">
          {question.sequence.map(
            (number, index) => (
              <React.Fragment key={index}>
                <span className="pattern-number">
                  {number}
                </span>

                {index <
                  question.sequence.length - 1 && (
                  <span className="pattern-arrow">
                    →
                  </span>
                )}
              </React.Fragment>
            )
          )}

          <span className="pattern-arrow">
            →
          </span>

          <span className="pattern-question-mark">
            ?
          </span>
        </div>
      </div>

      <div className="pattern-options">
        {question.options.map((option) => (
          <button
            type="button"
            key={option}
            className="pattern-option"
            onClick={() =>
              handleAnswer(option)
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternExercise;