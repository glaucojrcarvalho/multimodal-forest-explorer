import type { PublicResearchProject } from "../lib/research/projects";

export function ResearchCaseCard({ project }: { project: PublicResearchProject }) {
  return (
    <article>
      <p>{project.organization}</p>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <p>{project.themes.join(" · ")}</p>
      <a href={project.publicUrl} target="_blank" rel="noreferrer">
        Public source ↗
      </a>
    </article>
  );
}
