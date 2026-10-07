export interface LillomarkaSpecimen {
  id: string;
  treeId: string;
  acquisition: "ALSHD" | "MLS";
  species: "spruce" | "pine";
  ageYears: number;
  heightM: number;
  plot: string;
}

export const LILLOMARKA_SPECIMENS: LillomarkaSpecimen[] = [
  {
    id: "lillomarka_X1004_18_ALSHD",
    treeId: "lillomarka_X1004_18",
    acquisition: "ALSHD",
    species: "pine",
    ageYears: 69,
    heightM: 17.47,
    plot: "X1004"
  },
  {
    id: "lillomarka_X1004_18_MLS",
    treeId: "lillomarka_X1004_18",
    acquisition: "MLS",
    species: "pine",
    ageYears: 70,
    heightM: 17.66,
    plot: "X1004"
  },
  {
    id: "lillomarka_X1010_48_ALSHD",
    treeId: "lillomarka_X1010_48",
    acquisition: "ALSHD",
    species: "spruce",
    ageYears: 93,
    heightM: 19.81,
    plot: "X1010"
  },
  {
    id: "lillomarka_X1010_48_MLS",
    treeId: "lillomarka_X1010_48",
    acquisition: "MLS",
    species: "spruce",
    ageYears: 94,
    heightM: 19.82,
    plot: "X1010"
  },
  {
    id: "lillomarka_X1105_74_ALSHD",
    treeId: "lillomarka_X1105_74",
    acquisition: "ALSHD",
    species: "pine",
    ageYears: 222,
    heightM: 17.99,
    plot: "X1105"
  },
  {
    id: "lillomarka_X1105_74_MLS",
    treeId: "lillomarka_X1105_74",
    acquisition: "MLS",
    species: "pine",
    ageYears: 223,
    heightM: 18.21,
    plot: "X1105"
  }
];

export const LILLOMARKA_SPECIMEN_SOURCE =
  "https://zenodo.org/records/19853987/files/FORage_tree_metadata_train_val.csv?download=1";
