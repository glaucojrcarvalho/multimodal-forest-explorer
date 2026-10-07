export type ModalityId = "rgb" | "lidar" | "satellite" | "field" | "ai";

export type SpeciesKey = "spruce" | "pine" | "birch" | "unknown";

export interface GeoPoint {
  latitude: number;
  longitude: number;
  elevationM?: number;
}

export interface TreeRecord {
  id: string;
  x: number;
  z: number;
  heightM: number;
  crownRadiusM: number;
  species: SpeciesKey;
}

export interface Observation {
  id: string;
  modality: ModalityId;
  sourceId: string;
  recordedAt?: string;
  location?: GeoPoint;
  treeId?: string;
  notes?: string;
}

export interface ModelOutput {
  treeId: string;
  label: string;
  confidence?: number;
  uncertainty?: number;
  sourceObservationIds: string[];
}
