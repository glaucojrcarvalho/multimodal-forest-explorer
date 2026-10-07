# Multimodal Forest Explorer

An independent research-oriented prototype for exploring how multimodal data and AI can support forest monitoring, tree-level analysis, and biodiversity understanding.

## Status

Early prototype. The repository is intentionally developed with a **public-data-only** policy so it can be made public without exposing private, application-specific, or institution-internal information.

## Research framing

The initial product direction is inspired by publicly available research from NIBIO and collaborators on:

- digitalisation of forestry through **SFI SmartForest**;
- AI-assisted **individual-tree delineation** from high-resolution imagery and LiDAR;
- tree-level forest management and monitoring;
- cloud-based analysis of forest sensor data;
- multimodal forest and biodiversity mapping.

This repository is **not an official NIBIO, NMBU, SmartForest, or SingleTree project** and does not imply endorsement or affiliation.

## Principles

1. **Public sources only** — no private emails, application materials, unpublished datasets, credentials, or internal research information.
2. **Traceable provenance** — project claims and example data must have a documented source and license/usage status.
3. **No copied branding** — institutional names and logos are not used as product branding.
4. **Research before decoration** — visualizations should correspond to a defensible sensing or analysis concept.
5. **Synthetic-by-default demo data** — until a dataset is explicitly verified as reusable, 3D scenes and examples use synthetic or clearly licensed assets.

## Planned experience

A 3D forest interface where users can move between data modalities and see how each contributes to tree- and landscape-level understanding:

- RGB / drone imagery
- LiDAR / point clouds
- satellite observations
- terrain and canopy structure
- environmental or field observations
- model outputs such as individual-tree delineation, biomass, age, or biodiversity indicators

## Public research sources

The first research notes are based on public NIBIO pages:

- SFI SmartForest: https://www.nibio.no/en/projects/sfi-smartforest-bringing-industry-4.0-to-the-norwegian-forest-sector
- Stefano Puliti — NIBIO profile and publications: https://www.nibio.no/en/employees/stefano-puliti
- AI opens the door to single-tree-based forestry: https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2024/ai-opens-the-door-to-single-tree-based-forestry
- SmartForest with artificial intelligence in the cloud: https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2022/smartforest-with-artificial-intelligence-in-the-cloud

A more detailed source/provenance log will live under `docs/`.

## License

Source code licensing will be finalized before the repository is made public. Third-party datasets, imagery, models, publications, and assets remain subject to their original licenses and terms.


## Current deployment status

The application is prepared for a Vercel preview deployment. The runtime currently requires no secrets or private APIs.

Before production:

1. import the repository into Vercel;
2. set `NEXT_PUBLIC_SITE_URL` to the canonical deployment URL;
3. verify the preview deployment;
4. attach the final custom domain and update the canonical URL.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and [docs/DEPLOYMENT_READINESS.md](docs/DEPLOYMENT_READINESS.md).

## Local validation

```bash
npm install
npm run check
```


## Real-data showcase pipeline

The public viewer uses a deliberately small, reproducible derivative of the FOR-age dataset rather than bundling the full research archive.

- Source: FOR-age, DOI `10.5281/zenodo.19853987`.
- Study area: Lillomarka, Norway.
- Showcase: three individual trees, each represented by ALSHD and MLS acquisitions.
- Raw LAZ files are downloaded only during the data-build workflow and are not committed.
- `scripts/build_forage_showcase.py` deterministically samples at most 100,000 XYZ points per cloud, preserves metres, and writes browser-ready Float32 binaries plus a provenance manifest.
- Derived assets remain subject to the FOR-age OSOML v1.0 terms.

The workflow publishes generated assets to the `data/forage-showcase-v1` branch for review before they enter the deployable application.
