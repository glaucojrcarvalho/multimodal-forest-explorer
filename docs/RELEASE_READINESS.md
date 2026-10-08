# Release-readiness checklist — v0.1.0

## Data and research
- [x] FOR-age provenance is recorded with DOI and public source URLs.
- [x] Reuse and redistribution terms are documented in `docs/LICENSE_MATRIX.md`.
- [x] Real browser samples are deterministic derivatives of the official archive.
- [x] Raw FOR-age LAZ archives are not redistributed by the application.
- [x] Source-derived measurements are labeled as dataset metadata rather than model predictions.
- [x] No invented prediction or confidence value is presented as a research result.

## Privacy and ecology
- [x] No personal, restricted, or institution-internal information is present.
- [x] The showcase uses a published research study area and individual-tree dataset.
- [x] No additional sensitive ecological coordinates are introduced by the application.

## Product quality
- [x] Real Lillomarka point-cloud assets are present on `main`.
- [x] Production build is enforced in CI.
- [x] TypeScript validation is enforced on pull requests.
- [x] Keyboard focus and skip navigation are implemented.
- [x] Reduced-motion support is implemented.
- [x] Responsive layouts are defined for desktop, tablet, and mobile.
- [x] The viewer fails explicitly rather than substituting synthetic geometry when curated real data is unavailable.

## Presentation and provenance
- [x] Independence and non-affiliation are clear.
- [x] Institutional branding is not copied.
- [x] Source acknowledgements and DOI links are visible.
- [x] The UI exposes study area, sensor modality, tree metadata, source point count, rendered point count, and processing provenance.
- [x] README/documentation describe the real-data architecture.

## Production smoke test after release
- [ ] Confirm `https://forest.glaucojrcarvalho.com` loads the v0.1.0 release.
- [ ] Confirm at least one real point cloud renders on desktop.
- [ ] Confirm tree and ALSHD/MLS switching.
- [ ] Confirm mobile layout on a physical or emulated narrow viewport.
- [ ] Confirm Kartverket DTM and DOM context images load with visible attribution.
- [ ] Confirm Zenodo/source links.
- [ ] Confirm disclaimer, ethics, robots, sitemap, and health endpoint.

The unchecked items are post-deployment smoke tests, not reasons to withhold the release. If a critical smoke test fails, fix forward or redeploy the previous production version.
