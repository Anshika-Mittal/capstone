import React, {
  useEffect,
  useState
} from "react";

import FocusMeter
  from "./FocusMeter";

import {
  getNeurofeedback
} from "../../services/neurofeedbackApi";

import "./Neurofeedback.css";

function Neurofeedback() {

  const [
    focusProbability,
    setFocusProbability
  ] = useState(0.50);


  const [
    direction,
    setDirection
  ] = useState("stable");


  const [
    message,
    setMessage
  ] = useState(
    "Try to maintain concentration."
  );


  const [
    ballPosition,
    setBallPosition
  ] = useState(50);


  useEffect(() => {

    const interval =
      setInterval(
        async () => {

          try {

            /*
             * TEMPORARY EEG SIMULATION
             *
             * Replace this later with
             * your real EEG decoder.
             */

            const simulatedFocus =
              0.4 +
              Math.random() * 0.5;


            setFocusProbability(
              simulatedFocus
            );


            const feedback =
              await getNeurofeedback(
                simulatedFocus
              );


            setDirection(
              feedback.direction
            );


            setMessage(
              feedback.message
            );


            setBallPosition(
              previous => {

                if (
                  feedback.direction === "up"
                ) {

                  return Math.max(
                    0,
                    previous - 5
                  );
                }


                if (
                  feedback.direction === "down"
                ) {

                  return Math.min(
                    100,
                    previous + 5
                  );
                }


                return previous;
              }
            );

          }

          catch (error) {

            console.error(
              "Neurofeedback error:",
              error
            );
          }

        },

        1000
      );


    return () => {
      clearInterval(interval);
    };

  }, []);


  return (

    <div className="neurofeedback">

      <h1>
        EEG Neurofeedback
      </h1>


      <p>
        Try to maintain your concentration.
      </p>


      <FocusMeter
        focusProbability={
          focusProbability
        }
      />


      <div
        className="ball-container"
      >

        <div
          className="focus-ball"
          style={{
            bottom:
              `${ballPosition}%`
          }}
        >
          ●
        </div>

      </div>


      <h3>
        {message}
      </h3>


      <p>
        Current state:
        {" "}
        {direction}
      </p>

    </div>

  );
}


export default Neurofeedback;