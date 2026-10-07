

class NeurofeedbackController:

    def __init__(
        self,
        low_threshold=0.50,
        high_threshold=0.70
    ):

        self.low_threshold = low_threshold
        self.high_threshold = high_threshold

        self.previous_state = "stable"

    def get_feedback(self, focus_probability):

        if focus_probability < self.low_threshold:

            self.previous_state = "down"

            return {
                "direction": "down",
                "state": "low_focus",
                "message":
                    "Try to improve your concentration."
            }

        elif focus_probability > self.high_threshold:

            self.previous_state = "up"

            return {
                "direction": "up",
                "state": "high_focus",
                "message":
                    "Excellent focus. Keep going."
            }

        else:

            self.previous_state = "stable"

            return {
                "direction": "stable",
                "state": "moderate_focus",
                "message":
                    "Maintain your current concentration."
            }

        
controller = NeurofeedbackController()

print(controller.get_feedback(0.82))

from collections import deque


class FocusSmoother:

    def __init__(self, window_size=5):

        self.values = deque(
            maxlen=window_size
        )

    def update(self, probability):

        self.values.append(probability)

        return sum(self.values) / len(self.values)

smoother = FocusSmoother(window_size=5)

# smoothed_focus = smoother.update(
#     focus_probability
# )