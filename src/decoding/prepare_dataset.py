from pathlib import Path

import numpy as np
import pandas as pd

from src.eeg_pipeline import run_eeg_pipeline
from src.features.extract_features import extract_epoch_features


# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------

DATA_DIR = Path("data/raw")

RUNS = [
    "R04",
    "R08",
    "R12"
]

# Event IDs from the PhysioNet EEGMMIDB recordings
T1_EVENT_ID = 2
T2_EVENT_ID = 3


# ---------------------------------------------------------
# Extract features from one EDF file
# ---------------------------------------------------------

def process_file(file_path, subject_id):

    print("=" * 60)
    print(f"Processing: {file_path}")
    print("=" * 60)

    result = run_eeg_pipeline(str(file_path))

    epochs = result["epochs"]

    print("Total epochs:", len(epochs))

    # -----------------------------------------------------
    # Keep only T1 and T2
    # -----------------------------------------------------

    selected_event_ids = [T1_EVENT_ID, T2_EVENT_ID]

    epochs = epochs[
        np.isin(
            epochs.events[:, 2],
            selected_event_ids
        )
    ]

    print("T1/T2 epochs:", len(epochs))

    # -----------------------------------------------------
    # Extract features
    # -----------------------------------------------------

    feature_df = extract_epoch_features(epochs)

    # -----------------------------------------------------
    # Convert event IDs to binary labels
    #
    # T1 -> 0
    # T2 -> 1
    # -----------------------------------------------------

    feature_df["label"] = (
        feature_df["label"]
        .map({
            T1_EVENT_ID: 0,
            T2_EVENT_ID: 1
        })
    )

    # -----------------------------------------------------
    # Add metadata
    # -----------------------------------------------------

    feature_df["subject"] = subject_id

    feature_df["file"] = file_path.name

    return feature_df


# ---------------------------------------------------------
# Process all runs for one subject
# ---------------------------------------------------------

def process_subject(subject_id):

    subject_features = []

    for run in RUNS:

        filename = f"{subject_id}{run}.edf"

        file_path = DATA_DIR / filename

        if not file_path.exists():

            print(
                f"WARNING: File not found: {file_path}"
            )

            continue

        features = process_file(
            file_path,
            subject_id
        )

        subject_features.append(features)

    if not subject_features:

        raise FileNotFoundError(
            f"No EEG runs found for {subject_id}"
        )

    return pd.concat(
        subject_features,
        ignore_index=True
    )


# ---------------------------------------------------------
# Main
# ---------------------------------------------------------

def main():

    subjects = [
        "S001",
        "S002",
        "S003",
        "S004",
        "S005",
        "S006",
        "S007",
        "S008",
        "S009",
        "S010"
    ]

    all_subject_features = []

    for subject_id in subjects:

        try:

            subject_df = process_subject(
                subject_id
            )

            all_subject_features.append(
                subject_df
            )

        except FileNotFoundError as e:

            print("\nWARNING:")
            print(e)

            continue

    if not all_subject_features:

        raise RuntimeError(
            "No subject data was found."
        )

    # Combine all subjects
    df = pd.concat(
        all_subject_features,
        ignore_index=True
    )

    print("\n")
    print("=" * 60)
    print("FINAL MULTI-SUBJECT DATASET")
    print("=" * 60)

    print("Shape:", df.shape)

    print("\nLabels:")
    print(
        df["label"].value_counts()
    )

    print("\nSubjects:")
    print(
        df["subject"].value_counts()
    )

    print("\nFiles:")
    print(
        df["file"].value_counts()
    )

    print("\nMissing values:")
    print(
        df.isna().sum().sum()
    )

    # -----------------------------------------------------
    # Save
    # -----------------------------------------------------

    output_dir = Path("data/features")

    output_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    output_file = (
        output_dir /
        "motor_imagery_features.csv"
    )

    df.to_csv(
        output_file,
        index=False
    )

    print("\nSaved to:")
    print(output_file)


if __name__ == "__main__":
    main()