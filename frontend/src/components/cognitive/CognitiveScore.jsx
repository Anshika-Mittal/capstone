import { getCognitiveLevel } from "../../utils/cognitiveScore";
function CognitiveScore({ score }) {
  if (!score) {
    return null;
  }

  return (
    <div>
      <h2>Cognitive Performance Score</h2>

      <h1>{score.overall}/100</h1>

      <p>
        Performance Level:{" "}
        <strong>
          {getCognitiveLevel(score.overall)}
        </strong>
      </p>

      <div>
        <p>
          Memory: {score.memory}/100
        </p>

        <p>
          Attention: {score.attention}/100
        </p>

        <p>
          Reaction: {score.reaction}/100
        </p>

        <p>
          Pattern: {score.pattern}/100
        </p>

      </div>
    </div>
  );
}

export default CognitiveScore;