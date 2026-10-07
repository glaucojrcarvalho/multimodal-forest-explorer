"use client";

const observations = [
  { id: "field-01", x: -5.5, z: 3.2 },
  { id: "field-02", x: 2.8, z: -4.8 },
  { id: "field-03", x: 7.1, z: 1.5 }
];

export function FieldObservationLayer({ visible = false }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <group name="field-observation-layer">
      {observations.map((observation) => (
        <mesh key={observation.id} position={[observation.x, 0.24, observation.z]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#f2c15f" emissive="#6b4a12" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}
