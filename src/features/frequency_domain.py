import numpy as np
from scipy.signal import welch


BANDS = {
    "delta": (0.5, 4),
    "theta": (4, 8),
    "alpha": (8, 13),
    "beta": (13, 30),
    "gamma": (30, 40)
}


def extract_frequency_features(signal, sfreq):

    frequencies, psd = welch(
        signal,
        fs=sfreq
    )

    features = {}

    band_powers = {}

    # Calculate absolute band powers
    for band_name, (low, high) in BANDS.items():

        mask = (
            (frequencies >= low) &
            (frequencies < high)
        )

        power = np.trapezoid(
            psd[mask],
            frequencies[mask]
        )

        band_powers[band_name] = power

        features[f"{band_name}_power"] = power

    # Total power
    total_power = sum(band_powers.values())

    # Relative band powers
    if total_power > 0:

        for band_name, power in band_powers.items():

            features[
                f"{band_name}_relative_power"
            ] = power / total_power

    else:

        for band_name in band_powers:

            features[
                f"{band_name}_relative_power"
            ] = 0.0

    # Peak frequency
    peak_frequency = frequencies[
        np.argmax(psd)
    ]

    features["peak_frequency"] = peak_frequency

    return features
