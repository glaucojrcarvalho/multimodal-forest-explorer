"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type TreeDatum = {
  x: number;
  z: number;
  height: number;
  crown: number;
  species: "spruce" | "pine" | "birch";
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function Tree({ datum, index }: { datum: TreeDatum; index: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
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
      <mesh position={[0, datum.height * 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.13, datum.height * 0.64, 8]} />
        <meshStandardMaterial color="#765b43" roughness={0.95} />
      </mesh>
      <mesh position={[0, datum.height * 0.77, 0]} castShadow>
        <coneGeometry
          args={[datum.crown, datum.height * 0.62, 10, 3]}
        />
        <meshStandardMaterial color={crownColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Forest() {
  const trees = useMemo<TreeDatum[]>(
    () =>
      Array.from({ length: 90 }, (_, index) => {
        const angle = seeded(index, 1) * Math.PI * 2;
        const radius = 2.5 + Math.sqrt(seeded(index, 2)) * 18;
        const speciesRoll = seeded(index, 3);

        return {
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
          height: 2.6 + seeded(index, 4) * 4.4,
          crown: 0.7 + seeded(index, 5) * 0.85,
          species:
            speciesRoll > 0.84
              ? "birch"
              : speciesRoll > 0.47
                ? "pine"
                : "spruce"
        };
      }),
    []
  );

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[25, 64]} />
        <meshStandardMaterial color="#23362d" roughness={1} />
      </mesh>
      {trees.map((tree, index) => (
        <Tree key={index} datum={tree} index={index} />
      ))}
    </>
  );
}

export function ForestScene() {
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
      <Forest />
      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={28}
        minPolarAngle={Math.PI / 4.7}
        maxPolarAngle={Math.PI / 2.25}
        autoRotate
        autoRotateSpeed={0.28}
      />
      <Environment preset="forest" />
    </Canvas>
  );
}
