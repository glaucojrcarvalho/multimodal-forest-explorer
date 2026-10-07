"use client";

export function RgbLayer({ visible = true }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <group name="rgb-layer">
      <ambientLight intensity={0.15} />
    </group>
  );
}
