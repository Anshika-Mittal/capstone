import numpy as np


def extract_time_features(signal):

    return {
        "mean": np.mean(signal),
        "std": np.std(signal),
        "variance": np.var(signal)
    }