"use client";

export function SatelliteLayer({ visible = false }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]} name="satellite-layer">
      <circleGeometry args={[22, 64]} />
      <meshStandardMaterial color="#6f8467" transparent opacity={0.34} />
    </mesh>
  );
}
