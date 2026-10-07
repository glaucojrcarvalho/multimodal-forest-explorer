export const FOR_AGE = {
  title: "FOR-age Dataset",
  doi: "10.5281/zenodo.19853987",
  zenodoUrl: "https://zenodo.org/records/19853987",
  paperUrl: "https://www.sciencedirect.com/science/article/pii/S0034425726002324",
  codeUrl: "https://github.com/SingleTree-EU/FORage",
  benchmarkUrl: "https://www.codabench.org/competitions/16014/",
  published: "2026-04-28",
  pointClouds: 1775,
  individualTrees: 992,
  species: ["Picea abies", "Pinus sylvestris"],
  ageRangeYears: [1, 348] as const,
  countries: ["Norway", "Sweden", "Finland"],
  acquisition: [
    "Terrestrial Laser Scanning (TLS)",
    "Mobile Laser Scanning (MLS)",
    "High-density Airborne Laser Scanning (ALSHD)"
  ],
  split: {
    train: 70,
    validation: 15,
    test: 15,
    note: "Plot-level split designed to preserve spatial independence."
  },
  bestReported: {
    model: "Fine-tuned ForestFormer3D",
    rmseYears: 21,
    r2: 0.74
  },
  lillomarka: {
    country: "Norway",
    trees: 133,
    pointClouds: 266,
    ageRangeYears: [18, 223] as const
  },
  license: {
    name: "Open Science & Open Model License (OSOML) v1.0",
    note:
      "The dataset permits use and distribution with attribution and carries share-alike/open-access obligations for derived data, processing code, and trained models."
  }
} as const;
