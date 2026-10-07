import { FOR_AGE } from "../data/for-age";

const steps = [
  {
    id: "01",
    title: "Source",
    value: "Official FOR-age LAZ",
    copy: "Selected Lillomarka trees originate from the public FOR-age training archive on Zenodo."
  },
  {
    id: "02",
    title: "Process",
    value: "Deterministic sampling",
    copy: "build_forage_showcase.py centers coordinates, preserves metres, and samples at most 100,000 XYZ points per cloud."
  },
  {
    id: "03",
    title: "Publish",
    value: "Browser-sized XYZ",
    copy: "Six derived binary point clouds are shipped with a manifest that preserves source filenames, metadata, DOI, and license."
  },
  {
    id: "04",
    title: "Inspect",
    value: "Interactive 3D",
    copy: "The browser renders the derived geometry with source-derived tree attributes and sensor context."
  }
] as const;

export function ReproducibilityPanel() {
  return (
    <section className="reproPanel" id="reproducibility" aria-labelledby="repro-title">
      <div className="reproIntro">
        <div>
          <p className="eyebrow light">Reproducibility & provenance</p>
          <h2 id="repro-title">From the source archive to the pixels on screen.</h2>
        </div>
        <p>
          The viewer does not hide its data lineage. Every showcased cloud can be traced
          back to FOR-age, and the transformation into a browser asset is deterministic.
        </p>
      </div>

      <ol className="lineageFlow">
        {steps.map((step) => (
          <li key={step.id}>
            <span>{step.id}</span>
            <div>
              <small>{step.title}</small>
              <strong>{step.value}</strong>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="reproMeta">
        <div>
          <span>Dataset</span>
          <strong>FOR-age · DOI {FOR_AGE.doi}</strong>
        </div>
        <div>
          <span>Derived-data license</span>
          <strong>{FOR_AGE.license.name}</strong>
        </div>
        <div className="reproLinks">
          <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">Zenodo record ↗</a>
          <a href={FOR_AGE.paperUrl} target="_blank" rel="noreferrer">Published paper ↗</a>
          <a href={FOR_AGE.codeUrl} target="_blank" rel="noreferrer">FOR-age research code ↗</a>
        </div>
      </div>
    </section>
  );
}
