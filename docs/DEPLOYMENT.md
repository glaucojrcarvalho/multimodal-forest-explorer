# Deployment

## Production

Forest Intelligence Explorer is deployed at:

https://forest.glaucojrcarvalho.com

Vercel automatic Git deployments are disabled. Production changes are deployed only from published GitHub releases.

## Release flow

1. Merge reviewed work to `main`.
2. Confirm main validation is green.
3. Publish a GitHub release such as `v1.0.0`.
4. GitHub Actions checks out the released source and runs `npm run release:check`.
5. If validation passes, the workflow calls the Vercel production deploy hook stored as `VERCEL_DEPLOY_HOOK_URL`.
6. Run the production smoke test in `docs/RELEASE_READINESS.md`.

## Environment

Public environment contract:

```text
NEXT_PUBLIC_SITE_URL=https://forest.glaucojrcarvalho.com
```

No runtime secret is required by the application itself. The Vercel deploy hook is a CI credential and must remain in GitHub Actions Secrets.

## Local validation

```bash
npm ci
npm run release:check
```
