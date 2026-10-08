# Architecture

## Current system

Forest Intelligence Explorer is a Next.js research interface centered on real public forest data.

### Presentation
- Next.js App Router
- React components
- responsive semantic HTML
- server-rendered research/source content with client-only 3D interaction where required

### 3D visualization
- React Three Fiber / Three.js
- six browser-ready FOR-age point clouds representing three real Lillomarka trees
- paired airborne (ALSHD) and mobile (MLS) laser-scanning views
- height-based point coloring, camera presets, rotate/zoom interaction, and local LAS/LAZ inspection
- heavy viewer code is mounted only when the explorer approaches the viewport

### Geospatial context
- Kartverket DTM and DOM hillshade fetched from the official Geonorge WMS services
- server-side proxy routes provide stable same-origin delivery and caching
- terrain/surface imagery is presented as regional Lillomarka context, not exact tree co-registration

### Data pipeline
- source data remains on the official FOR-age Zenodo record
- `scripts/build_forage_showcase.py` deterministically transforms selected LAZ files into browser-ready Float32 XYZ assets
- `public/data/for-age/showcase-manifest.json` preserves source filenames, measurements, split, point counts, DOI, license, and processing lineage
- raw LAS/LAZ/ZIP archives are excluded from production

### Research context
- published FOR-age and ForestFormer3D results are presented as external references
- public NIBIO / SmartForest material frames the problem space
- the application performs no production ML inference and does not present model outputs as its own scientific results

### Provenance and policy
External data and assets require a public source, reuse basis, attribution, and sensitivity review before inclusion. Dataset licensing and derived-data boundaries are documented separately from application-code licensing.

## Runtime boundaries

The deployed application contains no private backend, credentials, research-partner API, restricted dataset, or institution-internal material. Optional local LAS/LAZ files are decoded in the visitor's browser and are not uploaded by the application.
