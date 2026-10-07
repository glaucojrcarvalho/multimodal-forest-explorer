import { MODALITIES } from "../lib/modalities";

export function MapLegend() {
  return (
    <aside aria-label="Map legend">
      <strong>Legend</strong>
      <ul>
        {MODALITIES.map((item) => (
          <li key={item.id}>
            <span aria-hidden="true">●</span> {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
