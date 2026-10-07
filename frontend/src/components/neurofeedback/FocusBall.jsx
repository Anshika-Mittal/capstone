import React from "react";


function FocusBall({
  direction
}) {

  let movement = 0;


  if (direction === "up") {
    movement = -20;
  }

  else if (direction === "down") {
    movement = 20;
  }


  return (
    <div className="ball-area">

      <div
        className="focus-ball"
        style={{
          transform:
            `translateY(${movement}px)`
        }}
      >
        ●
      </div>

    </div>
  );
}


export default FocusBall;