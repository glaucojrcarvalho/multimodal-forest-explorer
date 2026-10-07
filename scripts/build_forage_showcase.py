#!/usr/bin/env python3
"""Build small browser-ready point-cloud samples from the public FOR-age archive.

The output is derived data under the FOR-age OSOML v1.0 terms. The script is
intentionally deterministic so the public demo can be reproduced from the
source archive and metadata CSV.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import zlib
import zipfile
from pathlib import Path

import laspy
import numpy as np

SOURCE_RECORD = "https://zenodo.org/records/19853987"
SOURCE_ARCHIVE = "https://zenodo.org/records/19853987/files/train.zip?download=1"
SOURCE_METADATA = (
    "https://zenodo.org/records/19853987/files/"
    "FORage_tree_metadata_train_val.csv?download=1"
)
DOI = "10.5281/zenodo.19853987"
LICENSE = "Open Science & Open Model License (OSOML) v1.0"

SELECTED_SAMPLE_IDS = (
    "lillomarka_X1004_18_ALSHD",
    "lillomarka_X1004_18_MLS",
    "lillomarka_X1010_48_ALSHD",
    "lillomarka_X1010_48_MLS",
    "lillomarka_X1105_74_ALSHD",
    "lillomarka_X1105_74_MLS",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", required=True, type=Path)
    parser.add_argument("--metadata", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--max-points", type=int, default=100_000)
    return parser.parse_args()


def load_metadata(path: Path) -> dict[str, dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    return {row["sampleID"]: row for row in rows}


def deterministic_indices(count: int, limit: int, sample_id: str) -> np.ndarray:
    if count <= limit:
        return np.arange(count)
    seed = zlib.crc32(sample_id.encode("utf-8"))
    rng = np.random.default_rng(seed)
    return np.sort(rng.choice(count, size=limit, replace=False))


def find_member(names: list[str], filename: str) -> str:
    matches = [name for name in names if Path(name).name == filename]
    if len(matches) != 1:
        raise RuntimeError(
            f"Expected one archive member for {filename!r}, found {len(matches)}"
        )
    return matches[0]


def build_sample(
    archive: zipfile.ZipFile,
    names: list[str],
    row: dict[str, str],
    output_dir: Path,
    max_points: int,
) -> dict[str, object]:
    source_file = row["file"]
    member = find_member(names, source_file)

    with archive.open(member) as handle:
        las = laspy.read(io.BytesIO(handle.read()))

    x = np.asarray(las.x, dtype=np.float64)
    y = np.asarray(las.y, dtype=np.float64)
    z = np.asarray(las.z, dtype=np.float64)

    finite = np.isfinite(x) & np.isfinite(y) & np.isfinite(z)
    x, y, z = x[finite], y[finite], z[finite]
    if x.size == 0:
        raise RuntimeError(f"No finite points in {source_file}")

    min_x, max_x = float(x.min()), float(x.max())
    min_y, max_y = float(y.min()), float(y.max())
    min_z, max_z = float(z.min()), float(z.max())

    indices = deterministic_indices(x.size, max_points, row["sampleID"])
    x = x[indices]
    y = y[indices]
    z = z[indices]

    center_x = (min_x + max_x) / 2.0
    center_y = (min_y + max_y) / 2.0

    # Three.js convention: X/Z horizontal plane, Y vertical. Values stay in metres.
    positions = np.column_stack(
        (
            x - center_x,
            z - min_z,
            y - center_y,
        )
    ).astype("<f4", copy=False)

    asset_name = f"{row['sampleID']}.bin"
    asset_path = output_dir / asset_name
    positions.tofile(asset_path)

    return {
        "id": row["sampleID"],
        "treeId": row["treeID"],
        "project": row["projName"],
        "year": int(row["year"]),
        "modality": row["modality"],
        "plotId": row["projPlotID"],
        "treeNumber": row["projTreeID"],
        "species": row["species"],
        "heightM": float(row["height"]),
        "crownDiameterM": float(row["cdiam"]),
        "crownAreaM2": float(row["carea"]),
        "ageYears": int(row["age"]),
        "split": row["split"],
        "sourceFile": source_file,
        "assetUrl": f"/data/for-age/{asset_name}",
        "sourcePointCount": int(finite.sum()),
        "renderedPointCount": int(positions.shape[0]),
        "boundsM": {
            "width": round(max_x - min_x, 3),
            "depth": round(max_y - min_y, 3),
            "height": round(max_z - min_z, 3),
        },
    }


def main() -> None:
    args = parse_args()
    args.output.mkdir(parents=True, exist_ok=True)

    metadata = load_metadata(args.metadata)
    missing = [sample_id for sample_id in SELECTED_SAMPLE_IDS if sample_id not in metadata]
    if missing:
        raise RuntimeError(f"Selected samples missing from metadata: {missing}")

    with zipfile.ZipFile(args.archive) as archive:
        names = archive.namelist()
        samples = [
            build_sample(
                archive,
                names,
                metadata[sample_id],
                args.output,
                args.max_points,
            )
            for sample_id in SELECTED_SAMPLE_IDS
        ]

    manifest = {
        "schemaVersion": 1,
        "dataset": "FOR-age",
        "studyArea": "Lillomarka, Norway",
        "doi": DOI,
        "sourceRecord": SOURCE_RECORD,
        "sourceArchive": SOURCE_ARCHIVE,
        "sourceMetadata": SOURCE_METADATA,
        "license": LICENSE,
        "processing": {
            "coordinateTransform": "centred X/Z horizontal plane; ground-normalized Y; metres preserved",
            "sampling": f"deterministic random sample capped at {args.max_points:,} points per source cloud",
            "script": "scripts/build_forage_showcase.py",
        },
        "samples": samples,
    }

    manifest_path = args.output / "showcase-manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, indent=2, sort_keys=False) + "\n",
        encoding="utf-8",
    )

    print(
        json.dumps(
            {
                "manifest": str(manifest_path),
                "samples": len(samples),
                "renderedPoints": sum(
                    int(sample["renderedPointCount"]) for sample in samples
                ),
            }
        )
    )


if __name__ == "__main__":
    main()
