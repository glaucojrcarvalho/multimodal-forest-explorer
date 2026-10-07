import { DATASETS } from "../data/datasets";
import { RESEARCH_SOURCES } from "../data/research-sources";
import { ProvenanceBadge } from "./ProvenanceBadge";
import { SourceCitationPanel } from "./SourceCitationPanel";
import { UncertaintyIndicator } from "./UncertaintyIndicator";

export function TrustPanel() {
  const syntheticForest = DATASETS[0];
  const researchSource = RESEARCH_SOURCES[0];

  return (
    <section className="trustPanel" aria-labelledby="trust-heading">
      <div className="trustIntro">
        <p className="eyebrow">Provenance & uncertainty</p>
        <h2 id="trust-heading">The interface shows what is real, synthetic, and illustrative.</h2>
        <p>
          The current forest geometry and model-style overlays are demonstrations,
          not empirical measurements or scientific results.
        </p>
      </div>

      <div className="trustItems">
        <article>
          <span className="trustLabel">3D forest</span>
          <ProvenanceBadge kind={syntheticForest.kind} />
          <p>{syntheticForest.usageNote}</p>
        </article>
        <article>
          <span className="trustLabel">AI overlay</span>
          <UncertaintyIndicator value={0.18} />
          <p>
            The value is illustrative UI data only. It is not a benchmark,
            calibrated confidence score, or research finding.
          </p>
        </article>
        <SourceCitationPanel source={researchSource} />
      </div>
    </section>
  );
}
