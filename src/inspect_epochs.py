from src.eeg_pipeline import run_eeg_pipeline


# CHANGE THIS to the path of one PhysioNet EDF file
FILE_PATH = "data/raw/S001R12.edf"


def main():

    print("=" * 60)
    print("RUNNING EEG PIPELINE")
    print("=" * 60)

    result = run_eeg_pipeline(FILE_PATH)

    raw = result["raw"]
    cleaned_raw = result["cleaned_raw"]
    events = result["events"]
    event_dict = result["event_dict"]
    epochs = result["epochs"]

    print("\nRAW EEG")
    print("-" * 60)
    print("Number of channels:", len(raw.ch_names))
    print("Sampling frequency:", raw.info["sfreq"])
    print("Duration:", raw.times[-1])

    print("\nCLEANED EEG")
    print("-" * 60)
    print("Number of channels:", len(cleaned_raw.ch_names))
    print("Sampling frequency:", cleaned_raw.info["sfreq"])

    print("\nEVENTS")
    print("-" * 60)
    print("Events shape:", events.shape)
    print("Event dictionary:")
    print(event_dict)

    print("\nEPOCHS")
    print("-" * 60)
    print("Number of epochs:", len(epochs))
    print("Epoch shape:", epochs.get_data().shape)
    print("Channel names:", epochs.ch_names)
    print("Sampling frequency:", epochs.info["sfreq"])

    print("\nEPOCH EVENT IDs")
    print("-" * 60)
    print(epochs.events[:, 2])

    print("\nEPOCH EVENT COUNTS")
    print("-" * 60)

    unique_ids, counts = __import__("numpy").unique(
        epochs.events[:, 2],
        return_counts=True
    )

    for event_id, count in zip(unique_ids, counts):
        print(f"Event ID {event_id}: {count} epochs")


if __name__ == "__main__":
    main()