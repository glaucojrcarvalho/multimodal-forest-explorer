export interface PublicResearchProject {
  id: string;
  title: string;
  organization: string;
  publicUrl: string;
  summary: string;
  themes: string[];
  usageNote: string;
}

export function validatePublicResearchProject(project: PublicResearchProject): boolean {
  return project.publicUrl.startsWith("https://") && project.usageNote.length > 0;
}
