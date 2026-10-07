import numpy as np


def compute_spectral_entropy(signal, sfreq):

    from scipy.signal import welch

    frequencies, psd = welch(
        signal,
        fs=sfreq
    )

    total_power = np.sum(psd)

    if total_power == 0:
        return 0.0

    probability = psd / total_power

    entropy = -np.sum(
        probability *
        np.log2(probability + 1e-12)
    )

    return entropy