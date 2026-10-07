from src.acquisition.load_eeg import load_eeg
from src.preprocessing.preprocess_eeg import preprocess_eeg
from src.events.extract_events import extract_events
from src.events.create_epochs import create_epochs


def run_eeg_pipeline(file_path):

    # 1. Load EEG
    raw = load_eeg(file_path)

    # 2. Preprocess EEG
    cleaned_raw = preprocess_eeg(raw)

    # 3. Extract events
    events, event_dict = extract_events(cleaned_raw)

    # 4. Create epochs
    epochs = create_epochs(
        cleaned_raw,
        events,
        event_dict
    )

    return {
        "raw": raw,
        "cleaned_raw": cleaned_raw,
        "events": events,
        "event_dict": event_dict,
        "epochs": epochs
    }