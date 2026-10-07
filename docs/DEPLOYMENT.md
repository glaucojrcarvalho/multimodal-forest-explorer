# Deployment

The reference deployment target is Vercel.

## Vercel setup

1. Import `glaucojrcarvalho/multimodal-forest-explorer` into Vercel.
2. Framework preset: **Next.js**.
3. Build command: use the detected default, `npm run build`.
4. Install command: use the detected default, `npm install`.
5. Add one production environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://<final-domain>`
6. Deploy a preview before attaching the final custom domain.
7. Verify:
   - `/`
   - `/disclaimer`
   - `/ethics`
   - `/robots.txt`
   - `/sitemap.xml`
   - `/api/health`
   - social preview metadata

## Custom domain

After the domain is registered, add it to the Vercel project first. Vercel will provide the DNS records required for the domain/subdomain. Configure those records at the DNS provider, then update `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS URL and redeploy.

Do not hard-code AWS account information, Route 53 hosted-zone identifiers, Vercel tokens, or other infrastructure credentials into this repository.

## Repository visibility

The application can be deployed while the repository remains private. Before making the repository public, complete `docs/RELEASE_READINESS.md`.

## Security workflows

Build and TypeScript checks run for the private repository. CodeQL and Dependency Review are configured to activate when the repository becomes public, where the corresponding GitHub security capabilities are available.

## Runtime

The current public experience requires no secrets and no private APIs. The health endpoint exposes only a generic service/status response.


## Release-only production deployments

Automatic Vercel Git deployments are disabled by `vercel.json`.

Production deployment is triggered only when a GitHub Release is published.

### One-time Vercel/GitHub setup

1. In Vercel, create a **Deploy Hook** for this project targeting the production branch (`main`).
2. Copy the generated hook URL.
3. In GitHub, open **Settings → Secrets and variables → Actions**.
4. Create a repository secret named `VERCEL_DEPLOY_HOOK_URL`.
5. Store the Deploy Hook URL as the secret value.

The hook URL is a credential and must never be committed to the repository.

### Release flow

1. Merge reviewed work into `main`.
2. Ensure GitHub build/typecheck checks are green.
3. Publish a GitHub Release such as `v0.1.0`.
4. GitHub Actions runs `.github/workflows/deploy-release.yml`.
5. The workflow calls the Vercel Deploy Hook and Vercel performs the production deployment.

Pull requests and ordinary pushes do not deploy to Vercel.
