export const KARTVERKET = {
  name: "Kartverket / Norwegian Mapping Authority",
  attribution: "© Kartverket",
  license: "CC BY 4.0",
  termsUrl: "https://www.kartverket.no/en/api-and-data/terms-of-use/",
  dtmCapabilitiesUrl:
    "https://wms.geonorge.no/skwms1/wms.hoyde-dtm?request=GetCapabilities&service=WMS",
  domCapabilitiesUrl:
    "https://wms.geonorge.no/skwms1/wms.hoyde-dom?request=GetCapabilities&service=WMS",
  contextArea: {
    name: "Lillomarka, Oslo, Norway",
    // Regional context around Lillomarka. This is intentionally not presented
    // as the exact footprint of the individual FOR-age tree samples.
    bbox4326: [10.78, 59.94, 10.9, 60.03] as const
  },
  layers: {
    dtm: {
      label: "Digital terrain model",
      shortLabel: "DTM",
      serviceUrl: "https://wms.geonorge.no/skwms1/wms.hoyde-dtm",
      layer: "DTM:skyggerelieff",
      description:
        "Bare-earth hillshade that emphasizes ground relief beneath vegetation and structures."
    },
    dom: {
      label: "Digital surface model",
      shortLabel: "DOM",
      serviceUrl: "https://wms.geonorge.no/skwms1/wms.hoyde-dom",
      layer: "DOM:skyggerelieff",
      description:
        "Surface hillshade representing the upper surface, including vegetation and built structures."
    }
  }
} as const;

export type KartverketLayer = keyof typeof KARTVERKET.layers;
