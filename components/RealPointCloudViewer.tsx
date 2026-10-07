"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { parse } from "@loaders.gl/core";
import { LASLoader } from "@loaders.gl/las";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { LILLOMARKA_SPECIMENS, LILLOMARKA_SPECIMEN_SOURCE } from "../data/lillomarka-specimens";
import { FOR_AGE } from "../data/for-age";

type CloudData = {
  positions: Float32Array;
  sourcePointCount: number;
  renderedPointCount: number;
  widthM: number;
  depthM: number;
  heightM: number;
  fileName: string;
  inferred?: {
    dataset: string;
    acquisition?: string;
    species?: string;
    ageYears?: number;
  };
};

function inferForAgeFilename(fileName: string): CloudData["inferred"] {
  const stem = fileName.replace(/\.(las|laz)$/i, "");
  const parts = stem.split("_");
  const last = Number(parts.at(-1));
  const species = parts.at(-2);
  const acquisition = parts.find((value) => ["TLS", "MLS", "ALSHD"].includes(value));

  if (!Number.isFinite(last) || !["spruce", "pine"].includes(species ?? "")) {
    return { dataset: "Local LAS/LAZ file" };
  }

  return {
    dataset: stem.startsWith("lillomarka") ? "FOR-age · Lillomarka" : "FOR-age-compatible filename",
    acquisition,
    species,
    ageYears: last
  };
}

function normalizePositions(source: ArrayLike<number>, skip = 1) {
  const count = Math.floor(source.length / 3);
  const sampleCount = Math.ceil(count / skip);

  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (let i = 0; i < count; i += skip) {
    const offset = i * 3;
    const x = Number(source[offset]);
    const y = Number(source[offset + 1]);
    const z = Number(source[offset + 2]);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  const width = Math.max(maxX - minX, 0.001);
  const depth = Math.max(maxY - minY, 0.001);
  const height = Math.max(maxZ - minZ, 0.001);
  const maxSpan = Math.max(width, depth, height);
  const scale = 8 / maxSpan;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const positions = new Float32Array(sampleCount * 3);
  let cursor = 0;

  for (let i = 0; i < count; i += skip) {
    const offset = i * 3;
    const x = Number(source[offset]);
    const y = Number(source[offset + 1]);
    const z = Number(source[offset + 2]);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) continue;

    positions[cursor++] = (x - centerX) * scale;
    positions[cursor++] = (z - minZ) * scale;
    positions[cursor++] = (y - centerY) * scale;
  }

  return {
    positions: cursor === positions.length ? positions : positions.slice(0, cursor),
    widthM: width,
    depthM: depth,
    heightM: height
  };
}

function PointCloud({ cloud }: { cloud: CloudData }) {
  const geometry = useMemo(() => {
    const value = new THREE.BufferGeometry();
    value.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    value.computeBoundingSphere();
    return value;
  }, [cloud.positions]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#b9e6c5"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.92}
      />
    </points>
  );
}

export function RealPointCloudViewer() {
  const [cloud, setCloud] = useState<CloudData | null>(null);
  const [status, setStatus] = useState("Select a FOR-age .las or .laz tree point cloud.");
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File) {
    if (!/\.(las|laz)$/i.test(file.name)) {
      setStatus("Unsupported file. Select a .las or .laz point cloud.");
      return;
    }

    if (file.size > 80 * 1024 * 1024) {
      setStatus("For browser safety, use a single-tree file smaller than 80 MB.");
      return;
    }

    setBusy(true);
    setStatus("Decoding point cloud locally in your browser…");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const parsed = await parse(arrayBuffer, LASLoader, {
        core: { worker: false },
        las: { colorDepth: "auto", skip: 1 }
      });

      const mesh = parsed as unknown as {
        header?: { vertexCount?: number };
        attributes?: { POSITION?: { value?: ArrayLike<number> } };
      };
      const raw = mesh.attributes?.POSITION?.value;
      if (!raw || raw.length < 3) {
        throw new Error("No POSITION attribute was found in the LAS/LAZ file.");
      }

      const sourcePointCount = Math.floor(raw.length / 3);
      const maxRenderedPoints = 350_000;
      const renderSkip = Math.max(1, Math.ceil(sourcePointCount / maxRenderedPoints));
      const normalized = normalizePositions(raw, renderSkip);

      setCloud({
        ...normalized,
        sourcePointCount,
        renderedPointCount: Math.floor(normalized.positions.length / 3),
        fileName: file.name,
        inferred: inferForAgeFilename(file.name)
      });
      setStatus("Real point cloud loaded. Geometry stays in your browser; this site does not upload the file.");
    } catch (error) {
      console.error(error);
      setCloud(null);
      setStatus(
        error instanceof Error
          ? `Could not decode this file: ${error.message}`
          : "Could not decode this LAS/LAZ file."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="pointCloudLab" aria-labelledby="pointcloud-title">
      <div className="pointCloudHeader">
        <div>
          <p className="eyebrow">Real point-cloud laboratory</p>
          <h2 id="pointcloud-title">Inspect an actual FOR-age tree in 3D.</h2>
        </div>
        <p>
          Download a single-tree LAS/LAZ file from the official FOR-age Zenodo archive,
          then open it here. Parsing and rendering happen locally in the browser.
        </p>
      </div>

      <div className="pointCloudWorkspace">
        <div className="pointCloudViewport">
          {cloud ? (
            <Canvas camera={{ position: [7, 5, 8], fov: 42 }} dpr={[1, 1.6]}>
              <color attach="background" args={["#0d1712"]} />
              <fog attach="fog" args={["#0d1712", 10, 28]} />
              <gridHelper args={[18, 18, "#284d38", "#17281e"]} />
              <PointCloud cloud={cloud} />
              <OrbitControls
                makeDefault
                enableDamping
                minDistance={2}
                maxDistance={24}
              />
            </Canvas>
          ) : (
            <div className="pointCloudEmpty">
              <div className="cloudAxis" aria-hidden="true">
                <span>X</span><span>Y</span><span>Z</span>
              </div>
              <strong>No geometry fabricated.</strong>
              <p>
                The viewport remains empty until a real LAS/LAZ file is selected.
              </p>
            </div>
          )}
          <div className="pointCloudStatus">{busy ? "Processing" : cloud ? "Real data" : "Awaiting file"}</div>
        </div>

        <aside className="pointCloudSidebar">
          <div className="uploadCard">
            <span className="datasetKicker">Local dataset file</span>
            <label className="fileButton">
              <input
                type="file"
                accept=".las,.laz,application/octet-stream"
                disabled={busy}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleFile(file);
                }}
              />
              {busy ? "Decoding…" : "Open LAS / LAZ"}
            </label>
            <p>{status}</p>
            <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
              Download FOR-age on Zenodo ↗
            </a>
          </div>

          {cloud ? (
            <div className="cloudFacts">
              <span className="datasetKicker">Loaded specimen</span>
              <strong>{cloud.fileName}</strong>
              <dl>
                <div><dt>Source points</dt><dd>{cloud.sourcePointCount.toLocaleString("en-US")}</dd></div>
                <div><dt>Rendered</dt><dd>{cloud.renderedPointCount.toLocaleString("en-US")}</dd></div>
                <div><dt>Height extent</dt><dd>{cloud.heightM.toFixed(2)} m</dd></div>
                <div><dt>Width extent</dt><dd>{cloud.widthM.toFixed(2)} m</dd></div>
                <div><dt>Depth extent</dt><dd>{cloud.depthM.toFixed(2)} m</dd></div>
                <div><dt>Dataset</dt><dd>{cloud.inferred?.dataset ?? "Unknown"}</dd></div>
                {cloud.inferred?.acquisition ? <div><dt>Sensor</dt><dd>{cloud.inferred.acquisition}</dd></div> : null}
                {cloud.inferred?.species ? <div><dt>Species</dt><dd>{cloud.inferred.species}</dd></div> : null}
                {cloud.inferred?.ageYears !== undefined ? <div><dt>Age label</dt><dd>{cloud.inferred.ageYears} y</dd></div> : null}
              </dl>
            </div>
          ) : (
            <div className="specimenReferences">
              <span className="datasetKicker">Real Lillomarka examples</span>
              <p>Identifiers below come from the official FOR-age training split.</p>
              <ul>
                {LILLOMARKA_SPECIMENS.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <span>{item.species} · {item.ageYears} y</span>
                    <code>{item.id}</code>
                  </li>
                ))}
              </ul>
              <a href={LILLOMARKA_SPECIMEN_SOURCE} target="_blank" rel="noreferrer">
                Source list ↗
              </a>
            </div>
          )}
        </aside>
      </div>

      <p className="pointCloudNote">
        Privacy/data handling: the selected file is decoded client-side and is not sent to this application.
        Rendering may downsample very dense clouds for interaction; the source file remains unchanged.
      </p>
    </section>
  );
}
