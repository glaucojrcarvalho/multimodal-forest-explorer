# Performance budget

Interactive 3D should remain useful on ordinary laptops and modern mobile devices.

## Initial targets

- Production JavaScript should be reviewed when a change materially increases bundle size.
- Keep the default synthetic scene below 150 visible tree objects unless instancing or equivalent optimization is used.
- Keep synthetic point-cloud demonstrations below 50,000 visible points on the default view until profiling supports a higher limit.
- Avoid large uncompressed textures.
- Lazy-load optional visualization modules where practical.
- Target a responsive first interaction rather than cinematic rendering quality.
- Reduced-motion users should not depend on auto-rotation to understand the scene.

## Profiling

Performance changes should be measured in a production build. Record device/browser context when comparing frame rate or loading behavior.

Visual fidelity may be reduced on small screens when needed to preserve interaction quality and accessibility.
