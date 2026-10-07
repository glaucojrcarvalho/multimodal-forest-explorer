# Architecture

## Current system

The prototype is a client-facing Next.js application with React Three Fiber for interactive 3D rendering.

### Presentation
- Next.js App Router
- React components
- responsive semantic HTML

### Visualization
- Three.js through React Three Fiber
- deterministic synthetic forest geometry
- modality-specific scene layers

### Domain
- typed tree, observation, modality, model-output, and provenance records
- public research catalogs separated from visualization code

### Provenance
External data and assets require a source record and reuse basis before inclusion.

## Boundaries

The repository currently performs no production inference and contains no private backend, credentials, research partner API, or restricted dataset.

Future inference services should remain behind a documented API boundary so model execution, data governance, and UI concerns remain separable.
