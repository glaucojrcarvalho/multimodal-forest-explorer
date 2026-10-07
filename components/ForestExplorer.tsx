"use client";

import { useState } from "react";
import type { ModalityId } from "../lib/types/forest";
import { MODALITIES } from "../lib/modalities";
import { ForestScene } from "./ForestScene";
import { ModalitySwitcher } from "./ModalitySwitcher";

export function ForestExplorer() {
  const [active, setActive] = useState<ModalityId>("rgb");
  const modality = MODALITIES.find((item) => item.id === active) ?? MODALITIES[0];

  return (
    <div className="explorer">
      <div className="sceneWrap" aria-label="Interactive synthetic 3D forest">
        <ForestScene activeModality={active} />
        <div className="sceneBadge">
          <span className="pulse" />
          Interactive 3D scene
        </div>
        <div className="sceneMetric metricA">
          <strong>90</strong>
          <span>synthetic trees</span>
        </div>
        <div className="sceneMetric metricB">
          <strong>{modality.label}</strong>
          <span>{modality.scale} view</span>
        </div>
      </div>
      <div className="explorerControls">
        <div>
          <p className="controlEyebrow">Active modality</p>
          <strong>{modality.label}</strong>
          <p>{modality.shortDescription}</p>
        </div>
        <ModalitySwitcher active={active} setActive={setActive} />
      </div>
    </div>
  );
}
