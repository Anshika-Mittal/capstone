import numpy as np

def validate_epochs(epochs):

    data = epochs.get_data()

    print("===== EEG Quality Report =====")

    print("Number of epochs:", len(epochs))
    print("Number of channels:", len(epochs.ch_names))
    print("Samples per epoch:", data.shape[-1])

    print("Data shape:", data.shape)

    print("NaN values:", np.isnan(data).sum())
    print("Infinite values:", np.isinf(data).sum())
    print("Minimum amplitude:", data.min())
    print("Maximum amplitude:", data.max())
    print("Mean amplitude:", data.mean())
    print("Standard deviation:", data.std())

    print("==============================")