# Performance budget

The interactive real-data experience should remain useful on ordinary laptops and modern mobile devices.

## Current targets

- Keep each curated browser point cloud at or below 100,000 rendered XYZ points.
- Do not bundle the full FOR-age archive or raw LAZ files into the application.
- Mount the Three.js point-cloud laboratory only when it approaches the viewport.
- Load loaders.gl only when a visitor opens the optional local LAS/LAZ tool.
- Cache browser point-cloud assets and Kartverket WMS responses.
- Avoid large decorative textures or cinematic effects that do not improve research interpretation.
- Preserve responsive controls and readable metadata on narrow screens.
- Reduced-motion users must not depend on animation to understand content.

## Review criteria

A change that materially increases JavaScript, point count, image payload, or initial-page work should be profiled in a production build. Record device/browser context when comparing frame rate or load behavior.

Visual density may be reduced on small screens when needed to preserve interaction quality, accessibility, and page rhythm.
