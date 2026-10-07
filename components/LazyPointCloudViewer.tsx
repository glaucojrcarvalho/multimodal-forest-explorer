"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {ready ? (
        <RealPointCloudViewer />
      ) : (
        <div className="labLoading" aria-hidden="true">
          <span className="labLoadingPulse" />
          <div>
            <strong>Real-data laboratory</strong>
            <p>The 3D viewer loads as this section approaches the viewport.</p>
          </div>
        </div>
      )}
    </div>
  );
}
