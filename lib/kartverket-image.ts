import { KARTVERKET, type KartverketLayer } from "../data/kartverket";

export async function getKartverketContextImage(layerKey: KartverketLayer) {
  const layer = KARTVERKET.layers[layerKey];
  const [minLon, minLat, maxLon, maxLat] = KARTVERKET.contextArea.bbox4326;

  const params = new URLSearchParams({
    SERVICE: "WMS",
    VERSION: "1.1.1",
    REQUEST: "GetMap",
    LAYERS: layer.layer,
    STYLES: "",
    SRS: "EPSG:4326",
    BBOX: [minLon, minLat, maxLon, maxLat].join(","),
    WIDTH: "1200",
    HEIGHT: "760",
    FORMAT: "image/png",
    TRANSPARENT: "FALSE"
  });

  const response = await fetch(`${layer.serviceUrl}?${params.toString()}`, {
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    throw new Error(`Kartverket WMS returned HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("image/")) {
    throw new Error("Kartverket WMS did not return an image.");
  }

  return {
    bytes: await response.arrayBuffer(),
    contentType
  };
}
