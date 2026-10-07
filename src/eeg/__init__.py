class RealtimeEEGProcessor:

    def __init__(
        self,
        preprocessor,
        feature_extractor,
        decoder
    ):

        self.preprocessor = preprocessor
        self.feature_extractor = (
            feature_extractor
        )
        self.decoder = decoder


    def process(self, eeg_window):

        cleaned = (
            self.preprocessor.process(
                eeg_window
            )
        )

        features = (
            self.feature_extractor.extract(
                cleaned
            )
        )

        focus_probability = (
            self.decoder.predict_focus(
                features
            )
        )

        return focus_probability

