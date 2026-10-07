import type { ProvenanceKind } from "../lib/provenance";

const labels: Record<ProvenanceKind, string> = {
  synthetic: "Synthetic",
  "public-source": "Public source",
  licensed: "Licensed asset"
};

export function ProvenanceBadge({ kind }: { kind: ProvenanceKind }) {
  return <span title="Data provenance">{labels[kind]}</span>;
}
