# Deployment readiness

Forest Intelligence Explorer deploys to Vercel only when a GitHub Release is published.

## Production target

- Canonical URL: https://forest.glaucojrcarvalho.com
- Runtime: Next.js on Vercel
- Release trigger: GitHub `release.published`
- Vercel Git auto-deployments: disabled
- Deploy credential: `VERCEL_DEPLOY_HOOK_URL` GitHub Actions secret

## Required release validation

The release workflow performs all of the following before calling Vercel:

1. install dependencies on Node 24;
2. run TypeScript validation;
3. run a production Next.js build;
4. validate the FOR-age real-data bundle;
5. validate licensing/publication requirements;
6. call the Vercel production deploy hook.

Equivalent local command:

```bash
npm run release:check
```

## Data/runtime boundaries

- Six small FOR-age-derived XYZ assets ship with the application.
- Raw FOR-age LAS/LAZ/ZIP archives do not ship.
- Kartverket DTM/DOM images are fetched from official WMS services through cached same-origin server routes.
- Local LAS/LAZ files opened by a visitor are decoded in-browser and are not uploaded by the application.
- The application contains no production ML inference service and requires no private research API.

## Rollout procedure

1. Confirm the final PR is merged and main CI is green.
2. Publish a non-prerelease GitHub release, starting with `v1.0.0`.
3. Confirm the `Deploy release to Vercel` workflow succeeds.
4. Execute the smoke test in `docs/RELEASE_READINESS.md`.
5. If a critical smoke test fails, fix forward or redeploy the previous known-good production release.
