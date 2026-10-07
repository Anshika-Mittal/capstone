from fastapi import APIRouter
from pydantic import BaseModel
from fastapi import WebSocket

from ..neurofeedback.controller import (
    NeurofeedbackController
)


router = APIRouter(
    prefix="/api/neurofeedback",
    tags=["Neurofeedback"]
)


controller = NeurofeedbackController()


class NeurofeedbackInput(BaseModel):

    focus_probability: float


@router.post("/feedback")
def generate_feedback(
    data: NeurofeedbackInput
):

    probability = data.focus_probability

    feedback = controller.get_feedback(
        probability
    )

    return {
        "focus_probability": probability,
        "direction": feedback["direction"],
        "state": feedback["state"],
        "message": feedback["message"]
    }


from fastapi import WebSocket


@router.websocket("/stream")
async def neurofeedback_stream(
    websocket: WebSocket
):

    await websocket.accept()

    try:

        while True:

            data = await websocket.receive_json()

            eeg_window = data["eeg"]

            # Process EEG here

            # focus_probability =
            #     eeg_processor.process(eeg_window)

            focus_probability = 0.75

            feedback = controller.get_feedback(
                focus_probability
            )


            await websocket.send_json({

                "focus_probability":
                    focus_probability,

                "direction":
                    feedback["direction"],

                "state":
                    feedback["state"],

                "message":
                    feedback["message"]

            })


    except Exception:

        await websocket.close()

# focus_probability = \
#     eeg_processor.process(eeg_window)
focus_probability = 0.75