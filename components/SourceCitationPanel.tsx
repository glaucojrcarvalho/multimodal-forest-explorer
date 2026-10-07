import type { ProvenanceRecord } from "../lib/provenance";

export function SourceCitationPanel({ source }: { source: ProvenanceRecord }) {
  return (
    <aside className="citationPanel" aria-label="Research source">
      <span className="trustLabel">{source.organization ?? "Source"}</span>
      <strong>{source.title}</strong>
      <p>{source.usageNote}</p>
      {source.sourceUrl ? (
        <a href={source.sourceUrl} target="_blank" rel="noreferrer">
          Open public source ↗
        </a>
      ) : null}
    </aside>
  );
}
