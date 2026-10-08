import { KARTVERKET } from "../data/kartverket";

const cards = [
  {
    key: "dtm",
    label: KARTVERKET.layers.dtm.shortLabel,
    title: KARTVERKET.layers.dtm.label,
    src: "/api/kartverket/dtm",
    description: KARTVERKET.layers.dtm.description
  },
  {
    key: "dom",
    label: KARTVERKET.layers.dom.shortLabel,
    title: KARTVERKET.layers.dom.label,
    src: "/api/kartverket/dom",
    description: KARTVERKET.layers.dom.description
  }
] as const;

export function KartverketContextPanel() {
  return (
    <section className="terrainPanel" id="terrain-context" aria-labelledby="terrain-title">
      <div className="terrainIntro">
        <div>
          <p className="eyebrow">Norwegian elevation context</p>
          <h2 id="terrain-title">Place the individual trees inside a real landscape.</h2>
        </div>
        <p>
          Kartverket terrain and surface hillshade add regional context around Lillomarka.
          The view is contextual rather than a claim of exact co-registration with the
          individual FOR-age tree samples.
        </p>
      </div>

      <div className="terrainGrid">
        {cards.map((card) => (
          <figure className="terrainCard" key={card.key}>
            <div className="terrainImageWrap">
              <img
                src={card.src}
                alt={`${card.title} hillshade for the Lillomarka context area`}
                loading="lazy"
              />
              <span className="terrainBadge">{card.label}</span>
            </div>
            <figcaption>
              <strong>{card.title}</strong>
              <p>{card.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="terrainMeta">
        <p>
          Regional context: {KARTVERKET.contextArea.name}. The FOR-age browser manifest
          used by this prototype does not expose the exact geospatial coordinates of the
          selected tree samples, so these layers are not overlaid as if they were precisely aligned.
        </p>
        <div>
          <a href={KARTVERKET.dtmCapabilitiesUrl} target="_blank" rel="noreferrer">
            DTM WMS ↗
          </a>
          <a href={KARTVERKET.domCapabilitiesUrl} target="_blank" rel="noreferrer">
            DOM WMS ↗
          </a>
          <a href={KARTVERKET.termsUrl} target="_blank" rel="noreferrer">
            © Kartverket · {KARTVERKET.license} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
