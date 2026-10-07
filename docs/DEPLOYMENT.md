# Deployment

The reference deployment target is Vercel.

## Recommended flow

1. Keep the repository private while the prototype is under active review.
2. Connect the repository to a dedicated Vercel project.
3. Use preview deployments for pull requests.
4. Set `NEXT_PUBLIC_SITE_URL` to the deployed public URL.
5. Do not configure private research endpoints or restricted datasets for the public prototype.
6. Verify the production build and mobile rendering.
7. Run the release-readiness checklist before changing repository visibility.

## Environment

The current application requires no secret environment variables.

If future services require credentials, keep them server-side and outside client-exposed `NEXT_PUBLIC_*` variables.
