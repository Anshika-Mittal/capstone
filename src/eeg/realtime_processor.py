from collections import deque


class EEGBuffer:

    def __init__(
        self,
        n_channels=64,
        sampling_rate=160,
        window_seconds=2
    ):

        self.n_channels = n_channels

        self.window_size = (
            sampling_rate *
            window_seconds
        )

        self.buffer = deque(
            maxlen=self.window_size
        )


    def add_samples(
        self,
        samples
    ):

        for sample in samples:
            self.buffer.append(sample)


    def is_ready(self):

        return (
            len(self.buffer)
            >= self.window_size
        )


    def get_window(self):

        if not self.is_ready():
            return None

        return list(self.buffer)