# Forest Intelligence Explorer

An independent research-oriented prototype for exploring real forest point clouds,
tree-level analysis, and published AI research in a source-traceable interface.

## Current status

The deployed prototype is backed by a small real-data showcase derived from the
**FOR-age Dataset** (DOI `10.5281/zenodo.19853987`).

Current shipped slice:

- three real Lillomarka trees;
- paired ALSHD and MLS acquisitions (six point clouds);
- source-derived species, tree-age label, height, crown diameter, crown area,
  split, and point-count metadata;
- interactive browser visualization with rotate/zoom and sensor switching;
- deterministic preprocessing capped at 100,000 XYZ points per cloud;
- published FOR-age and ForestFormer3D research context;
- provenance, license, disclaimer, and data-ethics boundaries.

Production: https://forest.glaucojrcarvalho.com

This repository is **not an official NIBIO, NMBU, SmartForest, or SingleTree project**
and does not imply endorsement or affiliation.

## Research framing

The prototype is informed by public research from NIBIO, SmartForest, SingleTree,
and collaborators on digital forestry, individual-tree LiDAR analysis, 3D deep
learning, and forest decision support.

The primary real-data anchor is:

- FOR-age Dataset: https://zenodo.org/records/19853987
- Paper: https://doi.org/10.1016/j.rse.2026.115462
- Research code: https://github.com/SingleTree-EU/FORage
- Benchmark: https://www.codabench.org/competitions/16014/

Additional public research context is documented under `data/` and `docs/`.

## Product boundary

**Live now:** real LiDAR-derived individual-tree point clouds, source-backed tree
metadata, and Kartverket DTM / DOM hillshade as regional terrain and surface context.

**Roadmap:** RGB imagery, satellite observations, field measurements, and additional
empirical model outputs. Roadmap layers are presented as planned until real, reusable
data and provenance are integrated.

## Real-data showcase pipeline

The application does not bundle the full 2.6 GB FOR-age archive.

`scripts/build_forage_showcase.py`:

1. reads selected Lillomarka LAZ files from the official training archive;
2. preserves metres while centering horizontal coordinates and ground-normalizing height;
3. deterministically samples at most 100,000 points per cloud;
4. writes browser-ready little-endian Float32 XYZ binaries;
5. emits a provenance manifest containing source filenames, metadata, point counts,
   processing description, DOI, and license.

Raw LAZ/ZIP files are not committed to the application.

The derived browser assets live under `public/data/for-age/` with an attribution
notice and remain subject to the FOR-age OSOML v1.0 terms.

## Engineering

Stack:

- Next.js 14 / React 18
- React Three Fiber / Three.js
- loaders.gl for local LAS/LAZ inspection
- GitHub Actions validation
- Vercel production deployment triggered only by published GitHub releases

Local validation:

```bash
npm install
npm run typecheck
npm run build
```

The release workflow also executes `scripts/check_real_data_release.py` before
triggering the Vercel production hook.

## Publication principles

1. **Public or explicitly reusable sources only.**
2. **Traceable provenance for every external dataset and quantitative claim.**
3. **No private correspondence, application material, credentials, or unpublished research.**
4. **No institutional branding or implied affiliation.**
5. **No invented model predictions or decorative scientific metrics.**
6. **Planned functionality is labeled as roadmap, not presented as implemented.**

See:

- `docs/DATA_PROVENANCE.md`
- `docs/LICENSE_MATRIX.md`
- `docs/RELEASE_READINESS.md`
- `/disclaimer`
- `/ethics`

## Licensing

The FOR-age-derived browser data and the processing code used to generate it are
subject to the FOR-age **Open Science & Open Model License (OSOML) v1.0**, as
published with the Zenodo record.

A repository-level license for the independently written application code has not
yet been selected. Do not infer an application-code license from the dataset license.
