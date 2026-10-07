import mne


def extract_events(raw):
    """
    Extract events from EEG annotations.

    Parameters
    ----------
    raw : mne.io.Raw
        EEG recording.

    Returns
    -------
    events : ndarray
        Event information.
    event_dict : dict
        Mapping of event names to event IDs.
    """

    events, event_dict = mne.events_from_annotations(raw)

    return events, event_dict