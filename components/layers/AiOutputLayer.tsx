"use client";

const outputs = [
  { id: "tree-a", x: -2.8, z: -1.7, radius: 1.2 },
  { id: "tree-b", x: 3.4, z: 2.1, radius: 1.45 },
  { id: "tree-c", x: 6.2, z: -3.5, radius: 1.1 }
];

export function AiOutputLayer({ visible = false }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <group name="ai-output-layer">
      {outputs.map((output) => (
        <mesh key={output.id} position={[output.x, 0.08, output.z]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[output.radius - 0.04, output.radius, 40]} />
          <meshBasicMaterial color="#7ad4a0" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
