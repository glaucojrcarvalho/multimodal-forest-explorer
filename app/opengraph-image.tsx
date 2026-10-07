import { ImageResponse } from "next/og";
import { SITE } from "../lib/site";

export const runtime = "edge";
export const alt = "Forest Intelligence Explorer — multimodal AI for forest understanding";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#173d2d",
          color: "#f2f5f1"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "26px"
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#dfe9df",
              color: "#173d2d",
              fontWeight: 700
            }}
          >
            F
          </div>
          <span>{SITE.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
          <div style={{ fontSize: "72px", lineHeight: 1.02, letterSpacing: "-3px" }}>
            From a forest to individual trees.
          </div>
          <div style={{ marginTop: "28px", fontSize: "26px", color: "#b9cbbb" }}>
            Multimodal AI · RGB · LiDAR · satellite · field observations
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", color: "#9fb5a5" }}>
          <span>Independent research prototype</span>
          <span>Synthetic-by-default · public-source discipline</span>
        </div>
      </div>
    ),
    size
  );
}
