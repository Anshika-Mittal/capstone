import numpy as np


class EEGDecoder:

    def __init__(
        self,
        model,
        focused_label=1
    ):

        self.model = model

        self.focused_index = list(
            model.classes_
        ).index(focused_label)


    def predict_focus(self, features):

        X = np.asarray(
            features
        ).reshape(1, -1)

        probabilities = (
            self.model.predict_proba(X)
        )

        focus_probability = (
            probabilities[
                0,
                self.focused_index
            ]
        )

        return float(
            focus_probability
        )