#!/usr/bin/env python3
"""Fail a production release when the curated real-data bundle is incomplete.

This is intentionally dependency-free so the release workflow can validate the
published bundle before it calls the Vercel deploy hook.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "public" / "data" / "for-age"
MANIFEST_PATH = DATA_DIR / "showcase-manifest.json"
NOTICE_PATH = DATA_DIR / "NOTICE.md"
EXPECTED_DOI = "10.5281/zenodo.19853987"
EXPECTED_LICENSE_FRAGMENT = "OSOML"
EXPECTED_SAMPLES = 6


def fail(message: str) -> None:
    raise SystemExit(f"REAL-DATA RELEASE GATE FAILED: {message}")


def main() -> None:
    if not MANIFEST_PATH.is_file():
        fail(f"missing {MANIFEST_PATH.relative_to(ROOT)}")
    if not NOTICE_PATH.is_file():
        fail(f"missing {NOTICE_PATH.relative_to(ROOT)}")

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))

    if manifest.get("doi") != EXPECTED_DOI:
        fail("FOR-age DOI is missing or changed")
    if EXPECTED_LICENSE_FRAGMENT not in str(manifest.get("license", "")):
        fail("OSOML license declaration is missing")
    if not str(manifest.get("sourceRecord", "")).startswith("https://zenodo.org/"):
        fail("sourceRecord must point to Zenodo")
    if manifest.get("studyArea") != "Lillomarka, Norway":
        fail("study area must remain explicit")

    processing = manifest.get("processing") or {}
    if processing.get("script") != "scripts/build_forage_showcase.py":
        fail("processing lineage does not reference the public builder script")

    samples = manifest.get("samples")
    if not isinstance(samples, list) or len(samples) != EXPECTED_SAMPLES:
        fail(f"expected {EXPECTED_SAMPLES} curated samples")

    forbidden = [
        path for pattern in ("*.las", "*.laz", "*.zip") for path in DATA_DIR.glob(pattern)
    ]
    if forbidden:
        fail("raw LAS/LAZ/ZIP files must not be bundled in production")

    total_bytes = 0

    for sample in samples:
        asset_url = sample.get("assetUrl")
        if not isinstance(asset_url, str) or not asset_url.startswith("/data/for-age/"):
            fail(f"invalid assetUrl for {sample.get('id')}")

        asset = ROOT / "public" / asset_url.removeprefix("/")
        if not asset.is_file():
            fail(f"missing binary asset for {sample.get('id')}")

        expected_size = int(sample.get("renderedPointCount", 0)) * 3 * 4
        actual_size = asset.stat().st_size
        if expected_size <= 0 or actual_size != expected_size:
            fail(
                f"binary size mismatch for {sample.get('id')}: "
                f"expected {expected_size}, got {actual_size}"
            )

        if sample.get("project") != "lillomarka":
            fail(f"unexpected project for {sample.get('id')}")
        if sample.get("split") != "train":
            fail(f"showcase sample {sample.get('id')} must declare its source split")
        if not str(sample.get("sourceFile", "")).endswith(".laz"):
            fail(f"source LAZ filename missing for {sample.get('id')}")
        if sample.get("species") not in {"pine", "spruce"}:
            fail(f"unexpected species for {sample.get('id')}")
        if sample.get("modality") not in {"ALSHD", "MLS"}:
            fail(f"unexpected modality for {sample.get('id')}")
        if float(sample.get("heightM", 0)) <= 0 or int(sample.get("ageYears", 0)) <= 0:
            fail(f"non-positive scientific metadata for {sample.get('id')}")

        total_bytes += actual_size

    notice = NOTICE_PATH.read_text(encoding="utf-8")
    for required in (EXPECTED_DOI, "Derived Data", "OSOML"):
        if required not in notice:
            fail(f"NOTICE.md is missing required attribution text: {required}")

    print(
        "REAL-DATA RELEASE GATE PASSED: "
        f"{len(samples)} samples, {total_bytes / 1024 / 1024:.2f} MiB, "
        f"DOI {EXPECTED_DOI}"
    )


if __name__ == "__main__":
    main()
