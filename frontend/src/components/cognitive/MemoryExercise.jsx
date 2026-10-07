import { useEffect, useState } from "react";

const memorizedItems = [
  "APPLE",
  "CAR",
  "BOOK",
  "TREE",
];

const recallOptions = [
  "APPLE",
  "CAR",
  "BOOK",
  "TREE",
  "PHONE",
  "CHAIR",
];

function MemoryExercise({ onComplete }) {
  const [phase, setPhase] = useState("memorize");
  const [selectedItems, setSelectedItems] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [recallStartTime, setRecallStartTime] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const memorizeStart = performance.now();
    setStartTime(memorizeStart);

    const timer = setTimeout(() => {
      setPhase("recall");
      setRecallStartTime(performance.now());
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (item) => {
    setSelectedItems((previous) => {
      if (previous.includes(item)) {
        return previous.filter(
          (selected) => selected !== item
        );
      }

      return [...previous, item];
    });
  };

  const handleSubmit = () => {
    const recallEndTime = performance.now();

    const recallTime =
      (recallEndTime - recallStartTime) / 1000;

    const correct = selectedItems.filter((item) =>
      memorizedItems.includes(item)
    ).length;

    const falsePositives = selectedItems.filter(
      (item) => !memorizedItems.includes(item)
    ).length;

    const missed = memorizedItems.filter(
      (item) => !selectedItems.includes(item)
    ).length;

    const accuracy =
      (correct / memorizedItems.length) * 100;

    const memoryResult = {
      exercise: "memory",
      correct,
      total: memorizedItems.length,
      accuracy: Number(accuracy.toFixed(2)),
      falsePositives,
      missed,
      recallTime: Number(recallTime.toFixed(2)),
    };

    setResult(memoryResult);
    setPhase("result");

    if (onComplete) {
      onComplete(memoryResult);
    }
  };

  if (phase === "memorize") {
    return (
      <div className="exercise">
        <h2>Memory Exercise</h2>

        <h3>Remember these objects</h3>

        <div className="items">
          {memorizedItems.map((item) => (
            <div key={item} className="memory-item">
              {item}
            </div>
          ))}
        </div>

        <p>Remember as many objects as you can.</p>
      </div>
    );
  }

  if (phase === "recall") {
    return (
      <div className="exercise">
        <h2>Memory Exercise</h2>

        <h3>What objects do you remember?</h3>

        <div className="items">
          {recallOptions.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className={
                selectedItems.includes(item)
                  ? "selected"
                  : ""
              }
            >
              {item}
            </button>
          ))}
        </div>

        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="exercise">
        <h2>Memory Result</h2>

        <p>Correct: {result.correct}</p>

        <p>
          False Positives: {result.falsePositives}
        </p>

        <p>Missed: {result.missed}</p>

        <p>Accuracy: {result.accuracy}%</p>

        <p>
          Recall Time: {result.recallTime}s
        </p>
      </div>
    );
  }

  return null;
}

export default MemoryExercise;