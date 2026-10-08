# Project scope and future research directions

## Completed prototype scope

### Real individual-tree data
- FOR-age dataset integration with DOI/source attribution
- three Lillomarka trees and six paired ALSHD/MLS browser point clouds
- source-derived species, tree-age labels, height, crown measurements, split, and point counts
- interactive 3D inspection, camera presets, height legend, and local LAS/LAZ inspection

### Norwegian landscape context
- Kartverket DTM and DOM hillshade through official WMS services
- explicit © Kartverket / CC BY 4.0 attribution
- clear distinction between regional context and exact tree co-registration

### Research context
- FOR-age tree-age benchmark
- ForestFormer3D segmentation reference
- selected public NIBIO / SmartForest research context
- explicit separation between cited published results and functionality executed by this site

### Reproducibility and publication
- deterministic FOR-age preprocessing
- provenance manifest and release gate
- dataset/model license matrix
- disclaimer, data ethics, source log, and publication-safety rules
- responsive/mobile UI and accessible navigation
- release-only Vercel deployment to the custom production domain

## Future research directions

The stable prototype does not require the items below. They are possible extensions rather than unfinished v1 work:

- co-registered RGB/drone imagery;
- satellite time-series context;
- field-observation integration;
- exact geospatial co-registration when appropriate public coordinates are available;
- empirical model inference with a defined validation protocol;
- single- versus multimodal baseline experiments;
- larger remote point-cloud catalogs and tiled streaming.

Any future analytical result must follow the scientific-validation and provenance policies already documented in the repository.
