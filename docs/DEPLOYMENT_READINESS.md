# Deployment readiness audit

This document describes what must be true before the first Vercel production deployment.

## Automated validation

- [x] Next.js production build is enforced by GitHub Actions.
- [x] TypeScript no-emit validation is enforced on pull requests.
- [x] Security workflows are configured for the repository's private-to-public lifecycle.
- [x] The application does not require secret environment variables.
- [x] A public health endpoint exists at `/api/health`.

Run locally when needed:

```bash
npm install
npm run check
```

## Product readiness

- [x] Interactive 3D forest uses deterministic synthetic data.
- [x] RGB, LiDAR, satellite, field, and AI visualization modes are represented.
- [x] Modality controls expose pressed state to assistive technology.
- [x] Reduced-motion preference is respected by forest animation and auto-rotation.
- [x] Keyboard focus and skip-to-content behavior are present.
- [x] Responsive layouts are defined for desktop, tablet, and mobile widths.

## Research and provenance

- [x] Research framing is based on documented public sources.
- [x] The prototype states that it is independent and not institutionally endorsed.
- [x] Synthetic data is identified as synthetic.
- [x] Illustrative uncertainty is explicitly labeled as non-empirical.
- [x] Public research case studies link to their public sources.
- [x] Data ethics and research disclaimer pages are part of the site.

## Security and publication

- [x] No credentials are required by the runtime.
- [x] Environment examples contain only public-safe placeholders.
- [x] Baseline response security headers are configured.
- [x] Framework identification header is disabled.
- [x] No private correspondence or application-specific material is used.
- [x] External research assets are not copied into the repository.

## Metadata and discoverability

- [x] Canonical site URL is controlled through `NEXT_PUBLIC_SITE_URL`.
- [x] Open Graph and Twitter metadata are configured.
- [x] Project-owned application icon exists.
- [x] Robots and sitemap routes are present.

## Manual Vercel steps remaining

These are intentionally not stored in the repository:

- [ ] Import the GitHub repository into Vercel.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the preview/production canonical URL.
- [ ] Deploy and verify the preview.
- [ ] Add the custom domain after registration.
- [ ] Apply Vercel-provided DNS records at the domain/DNS provider.
- [ ] Switch `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain and redeploy.
- [ ] Verify the final production URL, social card, robots, sitemap, disclaimer, ethics page, and health endpoint.

Once the automated checks on the final deployment-readiness PR are green, the codebase is technically ready to import into Vercel.
