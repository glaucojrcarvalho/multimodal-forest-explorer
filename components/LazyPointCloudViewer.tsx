"use client";

import dynamic from "next/dynamic";

const RealPointCloudViewer = dynamic(
  () => import("./RealPointCloudViewer").then((module) => module.RealPointCloudViewer),
  {
    ssr: false,
    loading: () => (
      <div className="labLoading" role="status" aria-live="polite">
        <span className="labLoadingPulse" aria-hidden="true" />
        <div>
          <strong>Loading the real-data laboratory…</strong>
          <p>Preparing the interactive FOR-age point-cloud viewer.</p>
        </div>
      </div>
    )
  }
);

export function LazyPointCloudViewer() {
  return <RealPointCloudViewer />;
}
