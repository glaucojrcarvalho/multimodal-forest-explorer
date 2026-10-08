# Dataset and model license matrix

This matrix must be updated before any external dataset, model, imagery, or derived artifact is committed or deployed.

| Resource | Owner / publisher | Use in this project | License / terms | Current redistribution status |
|---|---|---|---|---|
| FOR-age Dataset (DOI 10.5281/zenodo.19853987) | SingleTree / dataset authors | Public metadata, methodology, benchmark references, and a small derived Lillomarka browser showcase | Open Science & Open Model License (OSOML) v1.0. Attribution required. Derived data and processing code carry the open/share-alike obligations described by the license. | Raw LAZ files are not redistributed. Six downsampled XYZ derivatives are generated reproducibly by the public script and remain under the dataset terms. |
| FOR-age research code | SingleTree-EU | Methodology reference only | Repository states GPL-3.0 / recommended AGPL-3.0 or GPL-3.0; inspect exact file/license before reuse. | Not copied. |
| ForestFormer3D | SmartForest-no and upstream contributors | Segmentation-method reference only | Repository documents CC BY-NC 4.0 inheritance from OneFormer3D. | Not copied; no model weights redistributed. |
| Kartverket Høydedata WMS (DTM / DOM hillshade) | Kartverket / Norwegian Mapping Authority | Regional terrain and surface context around Lillomarka via cached WMS requests | Kartverket free products are licensed CC BY 4.0. UI attribution is shown as `© Kartverket` with a link to the official terms. | Images are fetched from the official WMS through server routes and cached; no source raster dataset is bundled in the repository. |
| Synthetic forest geometry | This repository | Legacy prototype fallback | Project-owned | May remain only as an explicitly labeled fallback, not as empirical data. |

## Release rule

No external file enters `public/`, a deployment artifact, or a preprocessing pipeline until:

1. its exact source URL is recorded;
2. the license/version is recorded;
3. attribution text is prepared;
4. redistribution and derivative obligations are understood;
5. any ecological/location sensitivity is reviewed.
