export type ProvenanceKind = "synthetic" | "public-source" | "licensed";

export interface ProvenanceRecord {
  id: string;
  title: string;
  kind: ProvenanceKind;
  sourceUrl?: string;
  organization?: string;
  license?: string;
  retrievedAt?: string;
  usageNote: string;
}

export function isRedistributable(record: ProvenanceRecord): boolean {
  return record.kind === "synthetic" || Boolean(record.license);
}
