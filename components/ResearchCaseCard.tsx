import type { PublicResearchProject } from "../lib/research/projects";

export function ResearchCaseCard({ project }: { project: PublicResearchProject }) {
  return (
    <article className="researchCard">
      <div className="researchCardTop">
        <span>{project.organization}</span>
        <span>Public source</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="researchThemes" aria-label="Research themes">
        {project.themes.map((theme) => (
          <span key={theme}>{theme}</span>
        ))}
      </div>
      <p className="usageNote">{project.usageNote}</p>
      <a href={project.publicUrl} target="_blank" rel="noreferrer">
        Read the public source ↗
      </a>
    </article>
  );
}
