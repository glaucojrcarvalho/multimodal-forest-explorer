import type { ModalityId } from "./types/forest";

export interface ModalityDefinition {
  id: ModalityId;
  label: string;
  shortDescription: string;
  scale: "tree" | "plot" | "landscape" | "mixed";
}

export const MODALITIES: ModalityDefinition[] = [
  { id: "rgb", label: "RGB imagery", shortDescription: "Visible canopy and crown context.", scale: "mixed" },
  { id: "lidar", label: "LiDAR", shortDescription: "Three-dimensional forest structure.", scale: "tree" },
  { id: "satellite", label: "Satellite", shortDescription: "Repeated landscape-scale observation.", scale: "landscape" },
  { id: "field", label: "Field observations", shortDescription: "Ground-reference ecological observations.", scale: "plot" },
  { id: "ai", label: "AI outputs", shortDescription: "Illustrative model-derived tree attributes.", scale: "mixed" }
];
