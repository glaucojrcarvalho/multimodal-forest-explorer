#!/usr/bin/env python3
"""Validate repository state required for the stable public release."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_PATHS = [
    "LICENSE",
    "LICENSE_SCOPE.md",
    "NOTICE.md",
    "CITATION.cff",
    "README.md",
    "SECURITY.md",
    "docs/DATA_PROVENANCE.md",
    "docs/LICENSE_MATRIX.md",
    "docs/RELEASE_READINESS.md",
    "public/data/for-age/NOTICE.md",
    "public/data/for-age/showcase-manifest.json",
    "data/kartverket.ts",
]

FORBIDDEN_LEGACY_PATHS = [
    "components/ForestExplorer.tsx",
    "components/ForestScene.tsx",
    "components/ModalitySwitcher.tsx",
    "components/TrustPanel.tsx",
    "lib/synthetic/forest.ts",
    "data/datasets.ts",
]

PRODUCTION_URL = "https://forest.glaucojrcarvalho.com"


def fail(message: str) -> None:
    raise SystemExit(f"PUBLIC RELEASE GATE FAILED: {message}")


def text(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def main() -> None:
    for relative in REQUIRED_PATHS:
        if not (ROOT / relative).is_file():
            fail(f"required publication file is missing: {relative}")

    for relative in FORBIDDEN_LEGACY_PATHS:
        if (ROOT / relative).exists():
            fail(f"legacy synthetic implementation must not ship: {relative}")

    package = json.loads(text("package.json"))
    if package.get("version") != "1.0.0":
        fail("package.json must declare stable version 1.0.0")
    if package.get("private") is not True:
        fail("package.json should stay private to prevent accidental npm publication")

    site = text("lib/site.ts")
    if PRODUCTION_URL not in site:
        fail("canonical production domain is not the default site URL")

    readme = text("README.md")
    if PRODUCTION_URL not in readme:
        fail("README does not identify the production domain")

    license_scope = text("LICENSE_SCOPE.md")
    for required in ("MIT", "OSOML", "Kartverket", "CC BY 4.0"):
        if required not in license_scope:
            fail(f"LICENSE_SCOPE.md is missing: {required}")

    notice = text("NOTICE.md")
    for required in ("FOR-age", "10.5281/zenodo.19853987", "© Kartverket"):
        if required not in notice:
            fail(f"NOTICE.md is missing required attribution: {required}")

    kartverket = text("data/kartverket.ts")
    for required in (
        "wms.geonorge.no",
        "wms.hoyde-dtm",
        "wms.hoyde-dom",
        "CC BY 4.0",
        "© Kartverket",
    ):
        if required not in kartverket:
            fail(f"Kartverket source configuration is missing: {required}")

    forbidden_public = [
        path
        for suffix in ("*.las", "*.laz", "*.zip")
        for path in (ROOT / "public").rglob(suffix)
    ]
    if forbidden_public:
        joined = ", ".join(str(path.relative_to(ROOT)) for path in forbidden_public)
        fail(f"raw source archives must not ship in public/: {joined}")

    print("PUBLIC RELEASE GATE PASSED: stable v1 publication surface is complete")


if __name__ == "__main__":
    main()
