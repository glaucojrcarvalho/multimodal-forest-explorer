# Release-readiness checklist — v1.0.0

## Data and research
- [x] FOR-age provenance is recorded with DOI and public source URLs.
- [x] Six deterministic browser point clouds represent three real Lillomarka trees.
- [x] Raw FOR-age LAS/LAZ/ZIP archives are not redistributed.
- [x] Source-derived measurements are distinguished from published model metrics.
- [x] Kartverket DTM/DOM are presented as regional context, not exact tree co-registration.
- [x] No invented prediction or confidence value is presented as a research result.
- [x] Public research/source links were audited on 2026-10-08.

## Licensing and publication
- [x] Independently written application code has an MIT license.
- [x] FOR-age-derived data and preprocessing-code OSOML scope is explicit.
- [x] Kartverket CC BY 4.0 attribution and official terms are documented.
- [x] CITATION.cff and root NOTICE are present.
- [x] No private correspondence, application material, credentials, restricted endpoints, or institution-internal material is included.
- [x] Institutional references are clearly non-affiliating.

## Product quality
- [x] Real Lillomarka point-cloud assets are present.
- [x] Tree and ALSHD/MLS switching are implemented.
- [x] Height legend and Perspective / Front / Top / Reset controls are implemented.
- [x] Local LAS/LAZ inspection remains browser-local.
- [x] Kartverket DTM and DOM context is integrated.
- [x] Responsive mobile navigation and narrow-screen layouts are implemented.
- [x] Viewer code is mounted near the viewport and optional LAS/LAZ parsing is loaded on demand.
- [x] Legacy synthetic/procedural implementation code is removed.

## Engineering
- [x] Node 20 is declared in .nvmrc and package engines.
- [x] Production build and TypeScript checks run in CI.
- [x] Real-data release gate runs in CI and before production deployment.
- [x] Public-release policy gate runs in CI and before production deployment.
- [x] Production deployment is triggered only by a published GitHub release.
- [x] Canonical default URL is https://forest.glaucojrcarvalho.com.
- [x] Baseline security headers, robots, sitemap, metadata, disclaimer, ethics, and health route are configured.

## Production smoke test after v1.0.0 release
- [ ] Confirm https://forest.glaucojrcarvalho.com loads the v1.0.0 deployment.
- [ ] Confirm mobile navigation opens/closes without affecting page layout.
- [ ] Confirm all three trees and both ALSHD/MLS modes render.
- [ ] Confirm Perspective / Front / Top / Reset and height legend.
- [ ] Confirm Kartverket DTM and DOM images load with visible attribution.
- [ ] Confirm LiDAR and terrain-context roadmap links.
- [ ] Confirm Zenodo, paper DOI, research-code, benchmark, NIBIO, and Kartverket links.
- [ ] Confirm /disclaimer, /ethics, /robots.txt, /sitemap.xml, and /api/health.

The unchecked items are intentionally post-deployment checks. They validate the deployed artifact rather than source readiness.
