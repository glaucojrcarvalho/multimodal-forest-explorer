# Deployment readiness audit

This document describes the release gate for the first production version backed by real public forest point-cloud data.

## Automated validation

- [x] Next.js production build is enforced by GitHub Actions.
- [x] TypeScript no-emit validation is enforced on pull requests.
- [x] Security workflows are configured for the repository's private-to-public lifecycle.
- [x] The application runtime does not require secret environment variables.
- [x] A public health endpoint exists at `/api/health`.

## Real-data product readiness

- [x] The primary 3D laboratory renders real FOR-age individual-tree geometry, not procedural trees.
- [x] Six browser-ready point clouds represent three real Lillomarka trees with paired ALSHD/MLS acquisitions.
- [x] Browser samples preserve source-derived species, age, height, crown diameter, crown area, modality, split, and point counts.
- [x] Large raw LAZ archives remain on the official Zenodo record and are not bundled into the application.
- [x] Browser assets are deterministic derivatives produced by `scripts/build_forage_showcase.py`.
- [x] Users can rotate/zoom the point cloud and switch among the curated trees and sensor acquisitions.
- [x] Local LAS/LAZ inspection remains available without uploading the file to the application.

## Provenance, licensing, and scientific claims

- [x] FOR-age is identified by DOI `10.5281/zenodo.19853987`.
- [x] The generated manifest records source record, source archive, source metadata, processing method, and license.
- [x] FOR-age licensing is documented as Open Science & Open Model License (OSOML) v1.0.
- [x] Derived browser assets are generated reproducibly from the official source archive.
- [x] The interface distinguishes published/source-derived values from future or conceptual AI functionality.
- [x] Arbitrary synthetic uncertainty/model metrics were removed from the primary research interface.
- [x] The project states that it is independent and not institutionally endorsed.
- [x] No private correspondence, application material, restricted endpoints, or credentials are used.

## Security and publication

- [x] Environment examples contain only public-safe placeholders.
- [x] Baseline response security headers are configured.
- [x] Framework identification header is disabled.
- [x] External research links are public sources.
- [x] The release-only Vercel deployment workflow stores its deploy hook in GitHub Secrets.

## Metadata and domain

- [x] `NEXT_PUBLIC_SITE_URL` is configured for `https://forest.glaucojrcarvalho.com`.
- [x] The custom domain resolves to the Vercel project.
- [x] Open Graph and Twitter metadata are configured.
- [x] Robots and sitemap routes use the canonical site URL.
- [x] Disclaimer, ethics, and health routes are part of the application.

## Release procedure

1. Merge the final release-gate PR after Build and TypeScript checks pass.
2. Publish GitHub release `v0.1.0`.
3. The release event triggers `.github/workflows/deploy-release.yml`.
4. Verify production at `https://forest.glaucojrcarvalho.com`.
5. Smoke-test:
   - home page;
   - real Lillomarka point-cloud viewer;
   - switching trees and ALSHD/MLS;
   - dataset/source links;
   - `/disclaimer`;
   - `/ethics`;
   - `/robots.txt`;
   - `/sitemap.xml`;
   - `/api/health`.

Kartverket terrain/canopy context and additional research-task visualization are intentionally post-v0.1 improvements and are not blockers for this release.
