import mne


def load_eeg(file_path):
    """
    Load an EDF EEG recording.

    Parameters
    ----------
    file_path : str
        Path to the EDF file.

    Returns
    -------
    raw : mne.io.Raw
        Loaded EEG recording.
    """

    raw = mne.io.read_raw_edf(
        file_path,
        preload=True
    )

    return raw