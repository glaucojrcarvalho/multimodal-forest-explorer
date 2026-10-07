"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { ModalityId, TreeRecord } from "../lib/types/forest";
import { generateSyntheticForest } from "../lib/synthetic/forest";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { RgbLayer } from "./layers/RgbLayer";
import { LidarLayer } from "./layers/LidarLayer";
import { SatelliteLayer } from "./layers/SatelliteLayer";
import { FieldObservationLayer } from "./layers/FieldObservationLayer";
import { AiOutputLayer } from "./layers/AiOutputLayer";

function Tree({
  datum,
  index,
  animate
}: {
  datum: TreeRecord;
  index: number;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || !animate) return;
    group.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.25 + index) * 0.006;
  });

  const crownColor =
    datum.species === "birch"
      ? "#8ea477"
      : datum.species === "pine"
        ? "#45684e"
        : "#31533f";

  return (
    <group ref={group} position={[datum.x, 0, datum.z]}>
      <mesh position={[0, datum.heightM * 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.13, datum.heightM * 0.64, 8]} />
        <meshStandardMaterial color="#765b43" roughness={0.95} />
      </mesh>
      <mesh position={[0, datum.heightM * 0.77, 0]} castShadow>
        <coneGeometry
          args={[datum.crownRadiusM, datum.heightM * 0.62, 10, 3]}
        />
        <meshStandardMaterial color={crownColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Forest({ animate }: { animate: boolean }) {
  const trees = useMemo(() => generateSyntheticForest(90), []);

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[25, 64]} />
        <meshStandardMaterial color="#23362d" roughness={1} />
      </mesh>
      {trees.map((tree, index) => (
        <Tree key={tree.id} datum={tree} index={index} animate={animate} />
      ))}
    </>
  );
}

export function ForestScene({
  activeModality = "rgb"
}: {
  activeModality?: ModalityId;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [11, 8, 15], fov: 42 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#dce6e1"]} />
      <fog attach="fog" args={["#dce6e1", 18, 44]} />
      <ambientLight intensity={1.4} />
      <directionalLight
        position={[8, 14, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Forest animate={!prefersReducedMotion} />
      <RgbLayer visible={activeModality === "rgb"} />
      <LidarLayer visible={activeModality === "lidar"} />
      <SatelliteLayer visible={activeModality === "satellite"} />
      <FieldObservationLayer visible={activeModality === "field"} />
      <AiOutputLayer visible={activeModality === "ai"} />
      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={28}
        minPolarAngle={Math.PI / 4.7}
        maxPolarAngle={Math.PI / 2.25}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.28}
      />
      <Environment preset="forest" />
    </Canvas>
  );
}
