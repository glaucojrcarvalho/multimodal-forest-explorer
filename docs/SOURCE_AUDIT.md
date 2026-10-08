# Public source audit

Audit date: 2026-10-08

This audit verifies that the public references used by the stable prototype still resolve to
the intended authoritative or project-owned sources.

| Source | Purpose | Audit result |
|---|---|---|
| https://zenodo.org/records/19853987 | FOR-age dataset, metadata, DOI, and license | Accessible; authoritative dataset record |
| https://doi.org/10.1016/j.rse.2026.115462 | FOR-age paper | DOI resolves to ScienceDirect; automated page retrieval may encounter the publisher's bot challenge |
| https://github.com/SingleTree-EU/FORage | FOR-age research code | Accessible |
| https://www.codabench.org/competitions/16014/ | FOR-age benchmark | Accessible |
| https://github.com/SmartForest-no/ForestFormer3D | ForestFormer3D implementation/reference | Accessible |
| https://www.nibio.no/en/projects/sfi-smartforest-bringing-industry-4.0-to-the-norwegian-forest-sector | SmartForest context | Accessible |
| https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2024/ai-opens-the-door-to-single-tree-based-forestry | Single-tree forestry research context | Accessible |
| https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2022/smartforest-with-artificial-intelligence-in-the-cloud | Cloud/AI forestry context | Accessible |
| https://www.kartverket.no/en/api-and-data/terms-of-use/ | Kartverket attribution/license terms | Accessible |
| Kartverket `wms.hoyde-dtm` / `wms.hoyde-dom` GetCapabilities | DTM/DOM source configuration | Accessible; EPSG:4326 and hillshade layers available |

## Notes

- Publisher anti-bot behavior is not treated as evidence that a DOI is invalid.
- Dataset, software, and institutional references are external sources; their inclusion does not imply endorsement.
- Production data claims remain limited to what is represented in source metadata, the derived point-cloud manifest, and cited publications.
