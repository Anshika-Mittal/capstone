from pathlib import Path


def save_preprocessed_eeg(cleaned_raw, epochs, output_dir):

    output_dir = Path(output_dir)

    output_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    cleaned_raw.save(
        output_dir / "cleaned_raw.fif",
        overwrite=True
    )

    epochs.save(
        output_dir / "epochs-epo.fif",
        overwrite=True
    )