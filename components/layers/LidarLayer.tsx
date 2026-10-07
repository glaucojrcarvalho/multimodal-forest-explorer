"use client";

import { useMemo } from "react";
import * as THREE from "three";

function point(index: number) {
  const angle = index * 0.73;
  const radius = 2 + (index % 29) * 0.16;
  return [
    Math.cos(angle) * radius,
    0.4 + ((index * 17) % 41) * 0.11,
    Math.sin(angle) * radius
  ] as const;
}

export function LidarLayer({ visible = false }: { visible?: boolean }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(1200 * 3);
    for (let index = 0; index < 1200; index += 1) {
      const [x, y, z] = point(index);
      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;
    }
    const value = new THREE.BufferGeometry();
    value.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return value;
  }, []);

  if (!visible) return null;

  return (
    <points geometry={geometry} name="synthetic-lidar-layer">
      <pointsMaterial color="#d8e7d2" size={0.055} sizeAttenuation />
    </points>
  );
}
