import { FOR_AGE } from "../data/for-age";

const metrics = [
  ["Point clouds", FOR_AGE.pointClouds.toLocaleString("en-US")],
  ["Individual trees", FOR_AGE.individualTrees.toLocaleString("en-US")],
  ["Age range", `${FOR_AGE.ageRangeYears[0]}–${FOR_AGE.ageRangeYears[1]} years`],
  ["Species", String(FOR_AGE.species.length)]
];

export function ForAgeDatasetPanel() {
  return (
    <section className="datasetPanel" aria-labelledby="dataset-title">
      <div className="datasetTopline">
        <span>Public research dataset</span>
        <span>DOI {FOR_AGE.doi}</span>
      </div>

      <div className="datasetHeader compactDatasetHeader">
        <div>
          <p className="eyebrow">Current real-data anchor</p>
          <h2 id="dataset-title">FOR-age individual-tree point clouds.</h2>
        </div>
        <p>
          Boreal Norway spruce and Scots pine across Norway, Sweden, and Finland,
          with tree-age labels and multiple laser-scanning platforms.
        </p>
      </div>

      <div className="datasetMetrics" aria-label="FOR-age dataset metrics">
        {metrics.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="datasetQuickFact">
        <span>Lillomarka subset</span>
        <strong>{FOR_AGE.lillomarka.trees} trees · {FOR_AGE.lillomarka.pointClouds} point clouds</strong>
      </div>

      <details className="datasetDetails">
        <summary>Dataset methodology & benchmark</summary>
        <div className="datasetBody">
          <article>
            <span className="datasetKicker">Acquisition</span>
            <ul>
              {FOR_AGE.acquisition.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article>
            <span className="datasetKicker">Study design</span>
            <p>
              {FOR_AGE.split.train}% train · {FOR_AGE.split.validation}% validation · {FOR_AGE.split.test}% withheld test
            </p>
            <p>{FOR_AGE.split.note}</p>
          </article>

          <article>
            <span className="datasetKicker">Published benchmark</span>
            <p>{FOR_AGE.bestReported.model}</p>
            <p>
              RMSE ≈ {FOR_AGE.bestReported.rmseYears} years · R² ≈ {FOR_AGE.bestReported.r2}
            </p>
          </article>

          <article>
            <span className="datasetKicker">Lillomarka range</span>
            <p>
              Age {FOR_AGE.lillomarka.ageRangeYears[0]}–{FOR_AGE.lillomarka.ageRangeYears[1]} years
            </p>
            <p>Norway · paired ALSHD / MLS examples in this prototype</p>
          </article>
        </div>
      </details>

      <div className="datasetActions">
        <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">Zenodo ↗</a>
        <a href={FOR_AGE.paperUrl} target="_blank" rel="noreferrer">Paper ↗</a>
        <a href={FOR_AGE.codeUrl} target="_blank" rel="noreferrer">Research code ↗</a>
        <a href={FOR_AGE.benchmarkUrl} target="_blank" rel="noreferrer">Benchmark ↗</a>
      </div>

      <p className="datasetLicense">
        Six deterministic XYZ derivatives are served here; original LAZ archives remain on Zenodo.
      </p>
    </section>
  );
}
