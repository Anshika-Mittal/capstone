import pandas as pd

from .time_domain import extract_time_features
from .frequency_domain import extract_frequency_features
from .hjorth import hjorth_parameters
from .entropy import compute_spectral_entropy


def extract_channel_features(signal, sfreq):

    features = {}

    # Time-domain features
    features.update(
        extract_time_features(signal)
    )

    # Frequency-domain features
    features.update(
        extract_frequency_features(
            signal,
            sfreq
        )
    )

    # Hjorth parameters
    features.update(
        hjorth_parameters(signal)
    )

    # Spectral entropy
    features["spectral_entropy"] = (
        compute_spectral_entropy(
            signal,
            sfreq
        )
    )

    return features

def extract_epoch_features(epochs):

    data = epochs.get_data()

    sfreq = epochs.info["sfreq"]

    feature_rows = []

    for epoch_idx in range(data.shape[0]):

        epoch_features = {}

        for channel_idx in range(data.shape[1]):

            signal = data[
                epoch_idx,
                channel_idx,
                :
            ]

            channel_name = (
                epochs.ch_names[channel_idx]
            )

            channel_features = (
                extract_channel_features(
                    signal,
                    sfreq
                )
            )

            for feature_name, value in channel_features.items():

                column_name = (
                    f"{channel_name}_{feature_name}"
                )

                epoch_features[
                    column_name
                ] = value

        feature_rows.append(epoch_features)

    feature_df = pd.DataFrame(
        feature_rows
    )

    # Add labels
    feature_df["label"] = (
        epochs.events[:, 2]
    )

    return feature_df