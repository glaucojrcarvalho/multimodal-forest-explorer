# License scope

This repository contains independently written application code, external-source metadata,
and small derived research-data artifacts. They do not all share one license.

## MIT — application code

Unless a more specific notice applies, independently written source code and documentation in
this repository are licensed under the root [MIT License](./LICENSE).

## FOR-age / OSOML v1.0

The following are subject to the FOR-age **Open Science & Open Model License (OSOML) v1.0**
terms published with the source dataset at <https://zenodo.org/records/19853987>:

- `public/data/for-age/**` derived data artifacts;
- `scripts/build_forage_showcase.py`, because it processes FOR-age data and is part of the
  reproducible derived-data pipeline.

The original FOR-age LAZ/ZIP archives are not redistributed by this repository. See
`public/data/for-age/NOTICE.md` and `docs/LICENSE_MATRIX.md`.

## Kartverket

Kartverket DTM/DOM imagery is fetched at runtime from official WMS services and is not committed
as a raster dataset. Kartverket free products are used under **CC BY 4.0** with visible
`© Kartverket` attribution and links to the official terms.

## Third-party research and software

Links, paper titles, project descriptions, names, and source metadata remain subject to their
respective owners' rights and licenses. Referencing them in this repository does not relicense
those materials under MIT.
