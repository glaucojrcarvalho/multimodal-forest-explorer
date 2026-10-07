import { FOR_AGE } from "../data/for-age";
import { RESEARCH_SOURCES } from "../data/research-sources";
import { SourceCitationPanel } from "./SourceCitationPanel";

export function TrustPanel() {
  const researchSource = RESEARCH_SOURCES[0];

  return (
    <section className="trustPanel" aria-labelledby="trust-heading">
      <div className="trustIntro">
        <p className="eyebrow">Provenance & scientific claims</p>
        <h2 id="trust-heading">Every number should trace back to a dataset, paper, or method.</h2>
        <p>
          The interface no longer presents arbitrary uncertainty values or procedural
          tree counts as if they were research measurements.
        </p>
      </div>

      <div className="trustItems">
        <article>
          <span className="trustLabel">Dataset anchor</span>
          <strong>{FOR_AGE.title}</strong>
          <p>
            DOI {FOR_AGE.doi}. Public dataset metadata is used directly; raw point-cloud
            files are not yet redistributed by this repository.
          </p>
        </article>
        <article>
          <span className="trustLabel">License boundary</span>
          <strong>{FOR_AGE.license.name}</strong>
          <p>{FOR_AGE.license.note}</p>
        </article>
        <SourceCitationPanel source={researchSource} />
      </div>
    </section>
  );
}
