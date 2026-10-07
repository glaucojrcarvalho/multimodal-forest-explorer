import type { SpeciesKey, TreeRecord } from "../types/forest";

function seeded(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function generateSyntheticForest(count = 90): TreeRecord[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = seeded(index, 1) * Math.PI * 2;
    const radius = 2.5 + Math.sqrt(seeded(index, 2)) * 18;
    const roll = seeded(index, 3);
    const species: SpeciesKey =
      roll > 0.84 ? "birch" : roll > 0.47 ? "pine" : "spruce";

    return {
      id: `synthetic-tree-${index + 1}`,
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      heightM: 2.6 + seeded(index, 4) * 4.4,
      crownRadiusM: 0.7 + seeded(index, 5) * 0.85,
      species
    };
  });
}
