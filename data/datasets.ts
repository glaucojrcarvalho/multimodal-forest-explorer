import type { ProvenanceRecord } from "../lib/provenance";

export const DATASETS: ProvenanceRecord[] = [
  {
    id: "synthetic-forest-v1",
    title: "Synthetic Forest Geometry v1",
    kind: "synthetic",
    usageNote: "Generated deterministically in application code. Contains no external or real-world observations."
  }
];
