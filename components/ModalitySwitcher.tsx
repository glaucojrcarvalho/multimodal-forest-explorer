"use client";

import type { ModalityId } from "../lib/types/forest";
import { MODALITIES } from "../lib/modalities";

interface Props {
  active: ModalityId;
  setActive: (id: ModalityId) => void;
}

export function ModalitySwitcher({ active, setActive }: Props) {
  return (
    <div aria-label="Forest data modality" role="group">
      {MODALITIES.map((modality) => (
        <button
          key={modality.id}
          type="button"
          aria-pressed={active === modality.id}
          onClick={() => setActive(modality.id)}
        >
          {modality.label}
        </button>
      ))}
    </div>
  );
}
