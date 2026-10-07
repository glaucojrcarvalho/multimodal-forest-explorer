import { SiteNav } from "../components/SiteNav";
import { SkipLink } from "../components/SkipLink";
import { ResearchCaseCard } from "../components/ResearchCaseCard";
import { PUBLIC_RESEARCH_PROJECTS } from "../data/research-projects";
import { TrustPanel } from "../components/TrustPanel";
import { SiteFooter } from "../components/SiteFooter";
import { ForAgeDatasetPanel } from "../components/ForAgeDatasetPanel";
import { RealPointCloudViewer } from "../components/RealPointCloudViewer";
import { PrototypeEvidencePanel } from "../components/PrototypeEvidencePanel";
import { ResearchTaskPanel } from "../components/ResearchTaskPanel";

const modalities = [
  {
    id: "01",
    label: "RGB",
    status: "Planned context",
    title: "See the canopy",
    copy: "High-resolution imagery provides visible structure, crown boundaries, seasonal cues, and contextual information."
  },
  {
    id: "02",
    label: "LiDAR",
    status: "Live now",
    title: "Measure in 3D",
    copy: "Point clouds expose vertical structure and support tree-level geometry such as height, crown form, and spatial arrangement."
  },
  {
    id: "03",
    label: "Satellite",
    status: "Planned context",
    title: "Scale across landscapes",
    copy: "Repeated Earth observations add broad spatial coverage and temporal context beyond a single field campaign."
  },
  {
    id: "04",
    label: "Field",
    status: "Planned context",
    title: "Ground the models",
    copy: "Field observations connect remote measurements with species, ecology, validation, and biodiversity interpretation."
  }
];

export default function Home() {
  return (
    <main id="main-content">
      <SkipLink />
      <section className="hero">
        <SiteNav />

        <div className="shell heroGrid" id="top">
          <div className="heroCopy">
            <p className="eyebrow">Independent research prototype · 2026</p>
            <h1>
              From a forest
              <span>to individual trees.</span>
            </h1>
            <p className="lede">
              A research-oriented interface for real forest remote-sensing data,
              individual-tree 3D point clouds, published AI methods, and reproducible
              biodiversity analysis.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#dataset">
                Explore the real dataset
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
              Real public research metadata · raw datasets added only after license review
            </div>
          </div>

          <div id="dataset">
            <ForAgeDatasetPanel />
          </div>
        </div>
      </section>

      <section className="section shell">
        <RealPointCloudViewer />
      </section>

      <section className="section shell compactSection">
        <PrototypeEvidencePanel />
      </section>

      <section className="section shell compactSection">
        <ResearchTaskPanel />
      </section>

      <section className="section shell compactSection" id="modalities">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Multimodal roadmap</p>
            <h2>One real layer now, additional context without pretending it already exists.</h2>
          </div>
          <p>
            LiDAR is implemented with real FOR-age geometry. RGB, satellite, and field observations
            remain explicit roadmap layers until equally traceable public data is integrated.
          </p>
        </div>

        <div className="modalityGrid">
          {modalities.map((item) => (
            <article className="modalityCard" key={item.id}>
              <div className="cardTop">
                <span>{item.id} · {item.label}</span>
                <span className={item.status === "Live now" ? "layerStatus live" : "layerStatus"}>
                  {item.status}
                </span>
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

      <section className="section shell" id="research">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Public research cases</p>
            <h2>Research themes translated into an interactive product concept.</h2>
          </div>
          <p>
            These case studies are based only on publicly available NIBIO pages.
            They provide conceptual context; this site is an independent prototype
            and does not reproduce internal software, unpublished methods, or restricted data.
          </p>
        </div>
        <div className="researchGrid">
          {PUBLIC_RESEARCH_PROJECTS.map((project) => (
            <ResearchCaseCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section shell">
        <TrustPanel />
      </section>

      <section className="section shell" id="sources">
        <div className="sourcePanel">
          <div>
            <p className="eyebrow">Public-source discipline</p>
            <h2>Built to be safe to publish.</h2>
          </div>
          <p>
            The repository uses public research pages and dataset metadata with explicit
            citations. Browser point-cloud samples are reproducible derivatives of FOR-age;
            every external layer must document provenance, attribution, and redistribution obligations.
          </p>
          <a href="https://github.com/glaucojrcarvalho/multimodal-forest-explorer">
            View source policy ↗
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
