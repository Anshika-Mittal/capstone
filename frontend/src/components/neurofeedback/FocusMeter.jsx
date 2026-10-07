import React from "react";


function FocusMeter({
  focusProbability
}) {

  const percentage =
    Math.round(
      focusProbability * 100
    );


  return (
    <div className="focus-meter">

      <h2>FOCUS LEVEL</h2>

      <div className="focus-number">
        {percentage}%
      </div>

      <div className="meter-container">

        <div
          className="meter-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

    </div>
  );
}


export default FocusMeter;