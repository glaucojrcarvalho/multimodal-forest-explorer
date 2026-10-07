"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

type ViewPreset = "perspective" | "front" | "top";

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

function commonSpecies(species?: ShowcaseSample["species"]) {
  return species === "spruce" ? "Norway spruce" : "Scots pine";
}

function scientificSpecies(species?: ShowcaseSample["species"]) {
  return species === "spruce" ? "Picea abies" : "Pinus sylvestris";
}

function modalityLabel(modality?: ShowcaseSample["modality"]) {
  return modality === "MLS"
    ? "Mobile laser scanning (MLS)"
    : "Airborne laser scanning (ALSHD)";
}

function modalityButtonLabel(modality: ShowcaseSample["modality"]) {
  return modality === "MLS" ? "Mobile · MLS" : "Airborne · ALSHD";
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

function CameraPresetController({
  preset,
  revision,
  distance,
  targetY
}: {
  preset: ViewPreset;
  revision: number;
  distance: number;
  targetY: number;
}) {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    if (preset === "front") {
      camera.up.set(0, 1, 0);
      camera.position.set(0, targetY * 1.05, distance * 1.05);
    } else if (preset === "top") {
      camera.up.set(0, 0, -1);
      camera.position.set(0.001, distance * 1.3, 0.001);
    } else {
      camera.up.set(0, 1, 0);
      camera.position.set(distance * 0.75, distance * 0.55, distance * 0.75);
    }

    camera.lookAt(0, targetY, 0);
    camera.updateProjectionMatrix();
  }, [camera, preset, revision, distance, targetY]);

  return null;
}

export function RealPointCloudViewer() {
  const [manifest, setManifest] = useState<ShowcaseManifest | null>(null);
  const [cloud, setCloud] = useState<CloudData | null>(null);
  const [status, setStatus] = useState("Loading curated FOR-age showcase…");
  const [busy, setBusy] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [viewPreset, setViewPreset] = useState<ViewPreset>("perspective");
  const [viewRevision, setViewRevision] = useState(0);

  async function loadShowcaseSample(sample: ShowcaseSample) {
    setBusy(true);
    setStatus(`Loading real ${sample.modality} point cloud from Lillomarka…`);

    try {
      const response = await fetch(sample.assetUrl, { cache: "force-cache" });
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
      setViewPreset("perspective");
      setViewRevision((value) => value + 1);
    } catch (error) {
      console.error(error);
      setCloud(null);
      setStatus(
        "The curated real-data sample could not be loaded. You can still inspect a local LAS/LAZ file under Advanced tools."
      );
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const response = await fetch("/data/for-age/showcase-manifest.json", { cache: "force-cache" });
        if (!response.ok) throw new Error(`manifest returned HTTP ${response.status}`);
        const data = (await response.json()) as ShowcaseManifest;
        if (!active || data.samples.length === 0) return;

        setManifest(data);
        await loadShowcaseSample(data.samples[0]);
      } catch (error) {
        console.info("Curated FOR-age showcase is unavailable.", error);
        if (active) {
          setStatus(
            "The curated real-data sample is unavailable. Open a FOR-age LAS/LAZ file locally under Advanced tools."
          );
        }
      } finally {
        if (active) setInitialLoading(false);
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
    setStatus("Decoding point cloud locally in your browser…");

    try {
      const [{ parse }, { LASLoader }] = await Promise.all([
        import("@loaders.gl/core"),
        import("@loaders.gl/las")
      ]);

      const arrayBuffer = await file.arrayBuffer();
      const parsed = await parse(arrayBuffer, LASLoader, {
        core: { worker: false },
        las: { colorDepth: "auto", skip: 1 }
      });

      const mesh = parsed as unknown as {
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
      setStatus("Real point cloud loaded locally. This site does not upload the file.");
      setViewPreset("perspective");
      setViewRevision((value) => value + 1);
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
  const targetY = (cloud?.heightM ?? 18) * 0.45;

  function changeView(preset: ViewPreset) {
    setViewPreset(preset);
    setViewRevision((value) => value + 1);
  }

  function resetView() {
    setViewPreset("perspective");
    setViewRevision((value) => value + 1);
  }

  return (
    <section className="pointCloudLab" aria-labelledby="pointcloud-title" aria-busy={busy || initialLoading}>
      <div className="pointCloudHeader">
        <div>
          <p className="eyebrow">Real point-cloud laboratory</p>
          <h2 id="pointcloud-title">Inspect real Lillomarka trees in 3D.</h2>
        </div>
        <p>
          Rotate, zoom, switch specimens and compare airborne versus mobile laser
          scanning. Labels and geometry remain traceable to the public FOR-age dataset.
        </p>
      </div>

      {manifest ? (
        <div className="showcaseControls">
          <div>
            <span className="datasetKicker">Tree specimen</span>
            <div className="showcaseTreeButtons" role="group" aria-label="Select tree specimen">
              {treeIds.map((treeId) => {
                const sample = manifest.samples.find((item) => item.treeId === treeId);
                const active = activeSample?.treeId === treeId;
                return (
                  <button
                    key={treeId}
                    type="button"
                    aria-pressed={active}
                    className={active ? "sampleButton active" : "sampleButton"}
                    onClick={() => {
                      const preferred =
                        manifest.samples.find(
                          (item) => item.treeId === treeId && item.modality === (activeSample?.modality ?? "ALSHD")
                        ) ?? manifest.samples.find((item) => item.treeId === treeId);
                      if (preferred) void loadShowcaseSample(preferred);
                    }}
                  >
                    {commonSpecies(sample?.species)} · {sample?.ageYears} years
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="datasetKicker">Sensor</span>
            <div className="showcaseTreeButtons" role="group" aria-label="Select laser-scanning sensor">
              {(["ALSHD", "MLS"] as const).map((modality) => {
                const target = manifest.samples.find(
                  (item) => item.treeId === activeSample?.treeId && item.modality === modality
                );
                const active = activeSample?.modality === modality;
                return (
                  <button
                    key={modality}
                    type="button"
                    disabled={!target}
                    aria-pressed={active}
                    aria-label={modalityLabel(modality)}
                    title={modalityLabel(modality)}
                    className={active ? "sampleButton active" : "sampleButton"}
                    onClick={() => target && void loadShowcaseSample(target)}
                  >
                    {modalityButtonLabel(modality)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="viewerToolbar" aria-label="3D view controls">
        <div role="group" aria-label="Camera preset">
          {([
            ["perspective", "Perspective"],
            ["front", "Front"],
            ["top", "Top"]
          ] as const).map(([preset, label]) => (
            <button
              key={preset}
              type="button"
              aria-pressed={viewPreset === preset}
              onClick={() => changeView(preset)}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={resetView}>Reset view</button>
      </div>

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
              <CameraPresetController
                preset={viewPreset}
                revision={viewRevision}
                distance={cameraDistance}
                targetY={targetY}
              />
              <PointCloud cloud={cloud} />
              <OrbitControls
                makeDefault
                target={[0, targetY, 0]}
                enableDamping
                minDistance={2}
                maxDistance={60}
              />
            </Canvas>
          ) : initialLoading ? (
            <div className="pointCloudLoading" role="status" aria-live="polite">
              <span className="pointCloudLoadingPulse" aria-hidden="true" />
              <strong>Loading real FOR-age geometry…</strong>
              <p>Fetching the curated Lillomarka point-cloud sample.</p>
            </div>
          ) : (
            <div className="pointCloudEmpty">
              <div className="cloudAxis" aria-hidden="true">
                <span>X</span><span>Y</span><span>Z</span>
              </div>
              <strong>Real-data sample unavailable.</strong>
              <p>Use Advanced tools below to inspect a local LAS/LAZ file instead.</p>
            </div>
          )}

          <div className="pointCloudStatus">
            {busy ? "Loading" : cloud?.sample ? "FOR-age real data" : cloud ? "Local real data" : "Data unavailable"}
          </div>

          {cloud ? (
            <>
              <div className="pointCloudHint" aria-hidden="true">
                Drag to rotate · pinch or scroll to zoom
              </div>
              <div className="heightLegend" aria-label={`Point color encodes height from 0 to ${cloud.heightM.toFixed(1)} metres`}>
                <span>Height</span>
                <div className="heightLegendScale" aria-hidden="true" />
                <div className="heightLegendValues">
                  <small>0 m</small>
                  <small>{cloud.heightM.toFixed(1)} m</small>
                </div>
              </div>
            </>
          ) : null}

          {activeSample ? (
            <div className="pointCloudProvenance">
              Lillomarka · {modalityButtonLabel(activeSample.modality)} · {activeSample.renderedPointCount.toLocaleString("en-US")} displayed points
            </div>
          ) : null}

          {busy && cloud ? (
            <div className="cloudLoadingOverlay" role="status" aria-live="polite">
              Loading selected real-data cloud…
            </div>
          ) : null}
        </div>

        <aside className="pointCloudSidebar">
          {activeSample ? (
            <div className="cloudFacts">
              <span className="datasetKicker">Selected real tree</span>
              <strong>{commonSpecies(activeSample.species)} · {activeSample.ageYears} years</strong>
              <span className="sourceId">Source ID · {activeSample.treeId}</span>
              <dl>
                <div><dt>Species</dt><dd>{scientificSpecies(activeSample.species)}</dd></div>
                <div><dt>Age label</dt><dd>{activeSample.ageYears} years</dd></div>
                <div><dt>Acquisition</dt><dd>{modalityLabel(activeSample.modality)}</dd></div>
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

          {manifest ? (
            <div className="specimenReferences">
              <span className="datasetKicker">Reproducibility</span>
              <p>{manifest.processing.sampling}</p>
              <code>{manifest.processing.script}</code>
              <p>{manifest.license}</p>
            </div>
          ) : null}

          <details className="advancedTools">
            <summary>Advanced tools · local LAS/LAZ</summary>
            <div className="uploadCard">
              <p>
                Inspect another single-tree point cloud locally. The selected file stays in your browser.
              </p>
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
              <p role="status" aria-live="polite">{status}</p>
              <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
                Official FOR-age archive ↗
              </a>
            </div>
          </details>
        </aside>
      </div>

      <p className="pointCloudNote">
        Point color encodes normalized height. Showcase assets are deterministic XYZ derivatives
        of the public FOR-age dataset; raw LAZ files remain on the source archive.
      </p>
    </section>
  );
}
