export interface LillomarkaSpecimen {
  id: string;
  acquisition: "ALSHD" | "MLS";
  species: "spruce" | "pine";
  ageYears: number;
  plot: string;
}

const ids = [
  "lillomarka_21_ALSHD_X1002_10_spruce_22",
  "lillomarka_21_ALSHD_X1004_18_pine_69",
  "lillomarka_21_ALSHD_X1009_33_pine_42",
  "lillomarka_22_MLS_X1205_146_pine_209",
  "lillomarka_22_MLS_X1206_155_spruce_127",
  "lillomarka_22_MLS_X1206_163_spruce_141"
] as const;

function parseSpecimen(id: string): LillomarkaSpecimen {
  const parts = id.split("_");
  const acquisition = parts[2] as LillomarkaSpecimen["acquisition"];
  const species = parts.at(-2) as LillomarkaSpecimen["species"];
  const ageYears = Number(parts.at(-1));

  return {
    id,
    acquisition,
    species,
    ageYears,
    plot: parts[3]
  };
}

export const LILLOMARKA_SPECIMENS = ids.map(parseSpecimen);

export const LILLOMARKA_SPECIMEN_SOURCE =
  "https://github.com/SingleTree-EU/FORage/blob/main/FOR-age-tree-age-estimation/data/forage/meta_data/train_list.txt";
