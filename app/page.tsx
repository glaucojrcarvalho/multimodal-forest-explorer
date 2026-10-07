import { SiteNav } from "../components/SiteNav";
import { SkipLink } from "../components/SkipLink";
import { ResearchCaseCard } from "../components/ResearchCaseCard";
import { PUBLIC_RESEARCH_PROJECTS } from "../data/research-projects";
import { SiteFooter } from "../components/SiteFooter";
import { ForAgeDatasetPanel } from "../components/ForAgeDatasetPanel";
import { LazyPointCloudViewer } from "../components/LazyPointCloudViewer";
import { PrototypeEvidencePanel } from "../components/PrototypeEvidencePanel";
import { ResearchTaskPanel } from "../components/ResearchTaskPanel";
import { ReproducibilityPanel } from "../components/ReproducibilityPanel";
import { FOR_AGE } from "../data/for-age";

const modalities = [
  {
    id: "01",
    label: "LiDAR",
    status: "Live",
    title: "Individual-tree 3D",
    copy: "Real FOR-age point clouds with tree-level geometry, labels, sensor context, and provenance."
  },
  {
    id: "02",
    label: "RGB",
    status: "Planned",
    title: "Canopy imagery",
    copy: "High-resolution imagery for crown boundaries, seasonal cues, and visual context."
  },
  {
    id: "03",
    label: "Satellite",
    status: "Planned",
    title: "Landscape scale",
    copy: "Repeated Earth observations for broader spatial and temporal context."
  },
  {
    id: "04",
    label: "Field",
    status: "Planned",
    title: "Ground reference",
    copy: "Field observations for ecology, validation, and interpretation."
  }
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <SkipLink />
      <SiteNav />

      <section className="hero" id="top">
        <div className="shell heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Independent research prototype · 2026</p>
            <h1>
              From a forest
              <span>to individual trees.</span>
            </h1>
            <p className="lede">
              A research-oriented interface for real forest remote-sensing data,
              individual-tree 3D point clouds, published AI methods, and reproducible
              tree-level analysis.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#explorer">
                Inspect a real tree in 3D
              </a>
              <a className="textLink" href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
                View FOR-age source ↗
              </a>
            </div>
            <div className="heroFootnote">
              Real FOR-age data · traceable derived samples · no invented model outputs
            </div>
          </div>

          <div id="dataset">
            <ForAgeDatasetPanel />
          </div>
        </div>
      </section>

      <section className="section shell explorerSection" id="explorer">
        <LazyPointCloudViewer />
      </section>

      <section className="section shell compactSection">
        <PrototypeEvidencePanel />
      </section>

      <section className="section shell compactSection" id="research-tasks">
        <ResearchTaskPanel />
      </section>

      <section className="section shell compactSection" id="modalities">
        <div className="sectionHeader roadmapHeader">
          <div>
            <p className="eyebrow">Multimodal roadmap</p>
            <h2>What is implemented now, and what comes next.</h2>
          </div>
          <p>
            Only LiDAR is implemented in this release. Additional sensing layers stay
            explicitly planned until equally traceable public data is integrated.
          </p>
        </div>

        <div className="roadmapRail" role="list" aria-label="Multimodal implementation roadmap">
          {modalities.map((item) => (
            <article className="roadmapItem" key={item.id} role="listitem">
              <div className="roadmapIndex">{item.id}</div>
              <div className="roadmapCopy">
                <div className="roadmapTopline">
                  <span>{item.label}</span>
                  <span className={item.status === "Live" ? "layerStatus live" : "layerStatus"}>
                    {item.status}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="research">
        <div className="sectionHeader researchContextHeader">
          <div>
            <p className="eyebrow">Research context</p>
            <h2>Public work that frames the problem space.</h2>
          </div>
          <p>
            These references provide context for the prototype. They are not presented
            as work produced by this project, and no institutional affiliation is implied.
          </p>
        </div>
        <div className="researchGrid compactResearchGrid">
          {PUBLIC_RESEARCH_PROJECTS.map((project) => (
            <ResearchCaseCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section shell">
        <ReproducibilityPanel />
      </section>

      <SiteFooter />
    </main>
  );
}
