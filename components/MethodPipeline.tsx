const stages = [
  ["Observe", "Represent each sensing modality separately."],
  ["Align", "Connect observations in a shared spatial and semantic frame."],
  ["Model", "Produce candidate tree- or landscape-level outputs."],
  ["Evaluate", "Keep validation, uncertainty, and provenance visible."]
];

export function MethodPipeline() {
  return (
    <ol>
      {stages.map(([title, description], index) => (
        <li key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{title}</strong>
          <p>{description}</p>
        </li>
      ))}
    </ol>
  );
}
