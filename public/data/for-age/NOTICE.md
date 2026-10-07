# FOR-age Lillomarka showcase — attribution and derived-data notice

The binary point-cloud files in this directory are **Derived Data** from the
FOR-age Dataset, version v1.

- Dataset: **FOR-age Dataset**
- DOI: **10.5281/zenodo.19853987**
- Source record: https://zenodo.org/records/19853987
- Study area used here: **Lillomarka, Norway**
- Original data creators: the authors/creators listed on the Zenodo record,
  including Stefano Puliti, Nicolas Cattaneo, Marta Vergarechea, Eivind
  Handegard, Tuomas Yrttimaa, Mikko Vastaranta, Juha Hyyppä, and Rasmus Astrup.
- License: **Open Science & Open Model License (OSOML) v1.0**, as published
  with the Zenodo record.

## Changes made

The original individual-tree LAZ files are not redistributed here.

`scripts/build_forage_showcase.py`:

1. reads six selected Lillomarka individual-tree point clouds from the official
   FOR-age training archive;
2. centres horizontal coordinates around each tree;
3. ground-normalizes the vertical coordinate while preserving metres;
4. applies a deterministic random sample capped at 100,000 XYZ points per
   source cloud;
5. writes little-endian Float32 XYZ data for browser visualization.

The source metadata, source filenames, point counts, tree attributes, and
processing description are recorded in `showcase-manifest.json`.

These derived files are published under the same OSOML v1.0 terms described by
the original FOR-age record. No additional restriction is intended.
