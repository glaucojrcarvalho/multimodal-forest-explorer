import { FOR_AGE } from "../data/for-age";

const evidence = [
  {
    label: "Real data",
    value: "3 trees · 6 clouds",
    copy: "Three Lillomarka trees are available as paired airborne and mobile laser-scanning samples."
  },
  {
    label: "Tree attributes",
    value: "69–223 years",
    copy: "Species, age labels, height, crown measurements, acquisition modality, and split come from FOR-age metadata."
  },
  {
    label: "Browser rendering",
    value: "≤100k points / cloud",
    copy: "Each browser asset is generated deterministically and remains traceable to the FOR-age DOI."
  }
] as const;

export function PrototypeEvidencePanel() {
  return (
    <section className="evidencePanel" aria-labelledby="evidence-title">
      <div className="evidenceIntro">
        <p className="eyebrow">Current dataset view</p>
        <h2 id="evidence-title">A real-data path from source cloud to interactive tree.</h2>
        <p>
          The explorer combines public point-cloud geometry with source-derived tree
          attributes and transparent processing provenance.
        </p>
      </div>

      <div className="evidenceGrid">
        {evidence.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="evidenceSource">
        <span>Dataset</span>
        <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
          FOR-age · DOI {FOR_AGE.doi} ↗
        </a>
      </div>
    </section>
  );
}
