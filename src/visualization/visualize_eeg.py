import matplotlib.pyplot as plt


def plot_eeg(raw, duration=10, n_channels=20):
    """
    Plot EEG signals using MNE's interactive viewer.
    """

    raw.plot(
        duration=duration,
        n_channels=n_channels,
        scalings="auto"
    )


def plot_channel(raw, channel_index=0, duration=10):
    """
    Plot a single EEG channel.
    """

    data = raw.get_data()

    plt.figure(figsize=(15, 5))

    plt.plot(
        raw.times[:int(duration * raw.info["sfreq"])],
        data[channel_index][:int(duration * raw.info["sfreq"])]
    )

    plt.xlabel("Time (seconds)")
    plt.ylabel("Amplitude")
    plt.title(
        f"EEG - {raw.ch_names[channel_index]}"
    )

    plt.show()