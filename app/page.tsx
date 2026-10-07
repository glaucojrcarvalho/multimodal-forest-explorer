import dynamic from "next/dynamic";

const ForestScene = dynamic(
  () => import("../components/ForestScene").then((module) => module.ForestScene),
  { ssr: false }
);

const modalities = [
  {
    id: "01",
    label: "RGB",
    title: "See the canopy",
    copy: "High-resolution imagery provides visible structure, crown boundaries, seasonal cues, and contextual information."
  },
  {
    id: "02",
    label: "LiDAR",
    title: "Measure in 3D",
    copy: "Point clouds expose vertical structure and support tree-level geometry such as height, crown form, and spatial arrangement."
  },
  {
    id: "03",
    label: "Satellite",
    title: "Scale across landscapes",
    copy: "Repeated Earth observations add broad spatial coverage and temporal context beyond a single field campaign."
  },
  {
    id: "04",
    label: "Field",
    title: "Ground the models",
    copy: "Field observations connect remote measurements with species, ecology, validation, and biodiversity interpretation."
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand" href="#top" aria-label="Forest Intelligence Explorer">
            <span className="brandMark">F</span>
            <span>Forest Intelligence Explorer</span>
          </a>
          <div className="navLinks">
            <a href="#modalities">Modalities</a>
            <a href="#method">Method</a>
            <a href="#sources">Sources</a>
          </div>
        </nav>

        <div className="shell heroGrid" id="top">
          <div className="heroCopy">
            <p className="eyebrow">Independent research prototype · 2026</p>
            <h1>
              From a forest
              <span>to individual trees.</span>
            </h1>
            <p className="lede">
              An interactive exploration of how imagery, LiDAR, satellite
              observations, field data, and AI can contribute to richer
              forest and biodiversity understanding.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#modalities">
                Explore the modalities
              </a>
              <a
                className="textLink"
                href="https://www.nibio.no/en/projects/sfi-smartforest-bringing-industry-4.0-to-the-norwegian-forest-sector"
                target="_blank"
                rel="noreferrer"
              >
                Public research inspiration ↗
              </a>
            </div>
            <div className="heroFootnote">
              Synthetic demo scene · no restricted or institution-internal data
            </div>
          </div>

          <div className="sceneWrap" aria-label="Interactive synthetic 3D forest">
            <ForestScene />
            <div className="sceneBadge">
              <span className="pulse" />
              Interactive 3D scene
            </div>
            <div className="sceneMetric metricA">
              <strong>90</strong>
              <span>synthetic trees</span>
            </div>
            <div className="sceneMetric metricB">
              <strong>3</strong>
              <span>illustrative species</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" id="modalities">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Multimodal view</p>
            <h2>Different sensors describe different parts of the same forest.</h2>
          </div>
          <p>
            The prototype does not treat one modality as the answer. It is designed
            around the idea that complementary observations can be aligned, evaluated,
            and interpreted together.
          </p>
        </div>

        <div className="modalityGrid">
          {modalities.map((item) => (
            <article className="modalityCard" key={item.id}>
              <div className="cardTop">
                <span>{item.id}</span>
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="methodSection" id="method">
        <div className="shell methodGrid">
          <div>
            <p className="eyebrow light">Research-to-interface method</p>
            <h2>Make the reasoning visible, not only the final map.</h2>
          </div>
          <ol className="methodList">
            <li>
              <span>01</span>
              <div>
                <strong>Observe</strong>
                <p>Represent each public sensing modality separately.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Align</strong>
                <p>Bring spatial and semantic observations into a shared view.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Model</strong>
                <p>Show candidate AI outputs such as tree delineation and attributes.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Evaluate</strong>
                <p>Keep uncertainty, provenance, and validation visible to the user.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section shell" id="sources">
        <div className="sourcePanel">
          <div>
            <p className="eyebrow">Public-source discipline</p>
            <h2>Built to be safe to publish.</h2>
          </div>
          <p>
            The repository uses public research pages for conceptual framing and
            synthetic data for the initial 3D experience. External datasets or assets
            are only added after provenance and reuse rights are documented.
          </p>
          <a href="https://github.com/glaucojrcarvalho/multimodal-forest-explorer">
            View source policy ↗
          </a>
        </div>
      </section>
    </main>
  );
}
