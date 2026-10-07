"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { parse } from "@loaders.gl/core";
import { LASLoader } from "@loaders.gl/las";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { FOR_AGE } from "../data/for-age";

type ShowcaseSample = {
  id: string;
  treeId: string;
  project: string;
  year: number;
  modality: "ALSHD" | "MLS";
  plotId: string;
  treeNumber: string;
  species: "spruce" | "pine";
  heightM: number;
  crownDiameterM: number;
  crownAreaM2: number;
  ageYears: number;
  split: string;
  sourceFile: string;
  assetUrl: string;
  sourcePointCount: number;
  renderedPointCount: number;
  boundsM: {
    width: number;
    depth: number;
    height: number;
  };
};

type ShowcaseManifest = {
  schemaVersion: number;
  dataset: string;
  studyArea: string;
  doi: string;
  sourceRecord: string;
  sourceArchive: string;
  sourceMetadata: string;
  license: string;
  processing: {
    coordinateTransform: string;
    sampling: string;
    script: string;
  };
  samples: ShowcaseSample[];
};

type CloudData = {
  positions: Float32Array;
  sourcePointCount: number;
  renderedPointCount: number;
  widthM: number;
  depthM: number;
  heightM: number;
  fileName: string;
  sample?: ShowcaseSample;
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

    positions[cursor++] = x - centerX;
    positions[cursor++] = z - minZ;
    positions[cursor++] = y - centerY;
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

    const colors = new Float32Array(cloud.positions.length);
    const low = new THREE.Color("#345f48");
    const high = new THREE.Color("#d4f3c8");
    const color = new THREE.Color();
    const height = Math.max(cloud.heightM, 0.001);

    for (let i = 0; i < cloud.positions.length; i += 3) {
      const ratio = THREE.MathUtils.clamp(cloud.positions[i + 1] / height, 0, 1);
      color.copy(low).lerp(high, ratio);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    value.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    value.computeBoundingSphere();
    return value;
  }, [cloud]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.94}
      />
    </points>
  );
}

export function RealPointCloudViewer() {
  const [manifest, setManifest] = useState<ShowcaseManifest | null>(null);
  const [cloud, setCloud] = useState<CloudData | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [status, setStatus] = useState("Loading curated FOR-age showcase…");
  const [busy, setBusy] = useState(false);

  async function loadShowcaseSample(sample: ShowcaseSample) {
    setBusy(true);
    setSelectedSampleId(sample.id);
    setStatus(`Loading real ${sample.modality} point cloud from Lillomarka…`);

    try {
      const response = await fetch(sample.assetUrl);
      if (!response.ok) {
        throw new Error(`sample asset returned HTTP ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      if (buffer.byteLength % 12 !== 0) {
        throw new Error("invalid point-cloud binary length");
      }

      const positions = new Float32Array(buffer);
      setCloud({
        positions,
        sourcePointCount: sample.sourcePointCount,
        renderedPointCount: Math.floor(positions.length / 3),
        widthM: sample.boundsM.width,
        depthM: sample.boundsM.depth,
        heightM: sample.boundsM.height,
        fileName: sample.sourceFile,
        sample
      });
      setStatus("Real FOR-age geometry loaded from the reproducible Lillomarka showcase subset.");
    } catch (error) {
      console.error(error);
      setCloud(null);
      setStatus(
        "The curated sample has not been published yet. You can still open a FOR-age LAS/LAZ file locally below."
      );
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const response = await fetch("/data/for-age/showcase-manifest.json", { cache: "no-store" });
        if (!response.ok) throw new Error(`manifest returned HTTP ${response.status}`);
        const data = (await response.json()) as ShowcaseManifest;
        if (!active || data.samples.length === 0) return;

        setManifest(data);
        await loadShowcaseSample(data.samples[0]);
      } catch (error) {
        console.info("Curated FOR-age showcase is not available yet.", error);
        if (active) {
          setStatus(
            "Curated sample generation is pending. Open a FOR-age LAS/LAZ file locally to inspect real geometry."
          );
        }
      }
    }

    void bootstrap();
    return () => {
      active = false;
    };
  }, []);

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
    setSelectedSampleId(null);
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

  const treeIds = useMemo(
    () => manifest ? Array.from(new Set(manifest.samples.map((sample) => sample.treeId))) : [],
    [manifest]
  );

  const activeSample = cloud?.sample;
  const cameraDistance = Math.max(18, (cloud?.heightM ?? 18) * 1.15);

  return (
    <section className="pointCloudLab" aria-labelledby="pointcloud-title">
      <div className="pointCloudHeader">
        <div>
          <p className="eyebrow">Real point-cloud laboratory</p>
          <h2 id="pointcloud-title">Inspect real Lillomarka trees in 3D.</h2>
        </div>
        <p>
          These browser samples are deterministic downsamplings of individual-tree
          LAZ files from the public FOR-age dataset. Metres, species, age labels,
          acquisition modality, and source provenance remain visible.
        </p>
      </div>

      {manifest ? (
        <div className="showcaseControls">
          <div>
            <span className="datasetKicker">Tree</span>
            <div className="showcaseTreeButtons">
              {treeIds.map((treeId) => {
                const sample = manifest.samples.find((item) => item.treeId === treeId);
                const active = activeSample?.treeId === treeId;
                return (
                  <button
                    key={treeId}
                    type="button"
                    className={active ? "sampleButton active" : "sampleButton"}
                    onClick={() => {
                      const preferred =
                        manifest.samples.find(
                          (item) => item.treeId === treeId && item.modality === (activeSample?.modality ?? "ALSHD")
                        ) ?? manifest.samples.find((item) => item.treeId === treeId);
                      if (preferred) void loadShowcaseSample(preferred);
                    }}
                  >
                    {sample?.species === "spruce" ? "Norway spruce" : "Scots pine"} · {sample?.ageYears} y
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span className="datasetKicker">Sensor</span>
            <div className="showcaseTreeButtons">
              {(["ALSHD", "MLS"] as const).map((modality) => {
                const target = manifest.samples.find(
                  (item) => item.treeId === activeSample?.treeId && item.modality === modality
                );
                return (
                  <button
                    key={modality}
                    type="button"
                    disabled={!target}
                    className={activeSample?.modality === modality ? "sampleButton active" : "sampleButton"}
                    onClick={() => target && void loadShowcaseSample(target)}
                  >
                    {modality}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointCloudWorkspace">
        <div className="pointCloudViewport">
          {cloud ? (
            <Canvas
              camera={{ position: [cameraDistance * 0.75, cameraDistance * 0.55, cameraDistance * 0.75], fov: 42 }}
              dpr={[1, 1.6]}
            >
              <color attach="background" args={["#0d1712"]} />
              <fog attach="fog" args={["#0d1712", cameraDistance * 0.9, cameraDistance * 2.8]} />
              <gridHelper args={[40, 40, "#284d38", "#17281e"]} />
              <PointCloud cloud={cloud} />
              <OrbitControls
                makeDefault
                target={[0, cloud.heightM * 0.45, 0]}
                enableDamping
                minDistance={2}
                maxDistance={60}
              />
            </Canvas>
          ) : (
            <div className="pointCloudEmpty">
              <div className="cloudAxis" aria-hidden="true">
                <span>X</span><span>Y</span><span>Z</span>
              </div>
              <strong>Waiting for real geometry.</strong>
              <p>
                No procedural tree is substituted when the research sample is unavailable.
              </p>
            </div>
          )}
          <div className="pointCloudStatus">
            {busy ? "Loading" : cloud?.sample ? "FOR-age real data" : cloud ? "Local real data" : "Awaiting data"}
          </div>
          {activeSample ? (
            <div className="pointCloudProvenance">
              Lillomarka · {activeSample.modality} · {activeSample.renderedPointCount.toLocaleString("en-US")} displayed points
            </div>
          ) : null}
        </div>

        <aside className="pointCloudSidebar">
          {activeSample ? (
            <div className="cloudFacts">
              <span className="datasetKicker">Selected real tree</span>
              <strong>{activeSample.treeId}</strong>
              <dl>
                <div><dt>Species</dt><dd>{activeSample.species === "spruce" ? "Picea abies" : "Pinus sylvestris"}</dd></div>
                <div><dt>Age label</dt><dd>{activeSample.ageYears} years</dd></div>
                <div><dt>Acquisition</dt><dd>{activeSample.modality}</dd></div>
                <div><dt>Measured height</dt><dd>{activeSample.heightM.toFixed(2)} m</dd></div>
                <div><dt>Crown diameter</dt><dd>{activeSample.crownDiameterM.toFixed(2)} m</dd></div>
                <div><dt>Crown area</dt><dd>{activeSample.crownAreaM2.toFixed(2)} m²</dd></div>
                <div><dt>Source points</dt><dd>{activeSample.sourcePointCount.toLocaleString("en-US")}</dd></div>
                <div><dt>Displayed</dt><dd>{activeSample.renderedPointCount.toLocaleString("en-US")}</dd></div>
                <div><dt>Split</dt><dd>{activeSample.split}</dd></div>
              </dl>
              <a href={manifest?.sourceRecord ?? FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
                FOR-age DOI record ↗
              </a>
            </div>
          ) : cloud ? (
            <div className="cloudFacts">
              <span className="datasetKicker">Loaded local specimen</span>
              <strong>{cloud.fileName}</strong>
              <dl>
                <div><dt>Source points</dt><dd>{cloud.sourcePointCount.toLocaleString("en-US")}</dd></div>
                <div><dt>Rendered</dt><dd>{cloud.renderedPointCount.toLocaleString("en-US")}</dd></div>
                <div><dt>Height extent</dt><dd>{cloud.heightM.toFixed(2)} m</dd></div>
                <div><dt>Width extent</dt><dd>{cloud.widthM.toFixed(2)} m</dd></div>
                <div><dt>Depth extent</dt><dd>{cloud.depthM.toFixed(2)} m</dd></div>
              </dl>
            </div>
          ) : null}

          <div className="uploadCard">
            <span className="datasetKicker">Inspect another source file</span>
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
              {busy ? "Processing…" : "Open LAS / LAZ locally"}
            </label>
            <p>{status}</p>
            <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
              Official FOR-age archive ↗
            </a>
          </div>

          {manifest ? (
            <div className="specimenReferences">
              <span className="datasetKicker">Reproducibility</span>
              <p>{manifest.processing.sampling}</p>
              <code>{manifest.processing.script}</code>
              <p>{manifest.license}</p>
            </div>
          ) : null}
        </aside>
      </div>

      <p className="pointCloudNote">
        Showcase assets are derived from the public FOR-age dataset and remain traceable to DOI {FOR_AGE.doi}.
        The binary files contain only downsampled XYZ coordinates for browser rendering; raw LAZ files are not bundled with the application.
      </p>
    </section>
  );
}
