# Data provenance policy

Every external dataset or media asset used by the demo must be recorded here before it is committed.

| Asset / dataset | Source | License / reuse basis | Local path | Notes |
|---|---|---|---|---|
| FOR-age public metadata | https://zenodo.org/records/19853987 | OSOML v1.0 record metadata and dataset terms | `data/for-age.ts` | Source-backed dataset composition, study split, Lillomarka subset, and benchmark metadata. No raw point-cloud files redistributed. |
| Synthetic forest geometry | Generated in application code | Project-owned | legacy components | Retained only as legacy/fallback prototype code; no longer the primary landing-page evidence. |

## Rules

1. Real public data is preferred for scientific demonstrations when provenance and terms are clear.
2. Record the exact source URL for external data.
3. Record the license or explicit reuse basis.
4. Do not infer that "publicly visible" means "redistributable".
5. Keep raw restricted data outside this repository.
6. If attribution is required, surface it in the UI and documentation.
7. Never present synthetic or illustrative values as empirical measurements or model benchmarks.
