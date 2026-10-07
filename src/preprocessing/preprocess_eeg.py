def preprocess_eeg(raw):
    """
    Basic EEG preprocessing.

    Parameters
    ----------
    raw : mne.io.Raw
        Raw EEG recording.

    Returns
    -------
    raw_filtered : mne.io.Raw
        Preprocessed EEG.
    """

    raw_filtered = raw.copy()

    # Band-pass filter
    raw_filtered.filter(
        l_freq=1,
        h_freq=60
    )

    raw_filtered.notch_filter(
        freqs=50
    )

    # Artifact removal
    # ICA ...

    # Re-reference
    raw_filtered.set_eeg_reference("average")

    return raw_filtered