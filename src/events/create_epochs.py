import mne


def create_epochs(raw, events, event_dict):
    """
    Create EEG epochs around events.
    """

    epochs = mne.Epochs(
        raw,
        events,
        event_id=event_dict,
        tmin=0,
        tmax=4,
        baseline=None,
        preload=True
    )

    return epochs