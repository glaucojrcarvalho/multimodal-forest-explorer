# Security and public-repository policy

This project is designed for public release and external review.

## Never commit

- API keys, tokens, passwords, cookies, SSH keys, connection strings, or private URLs
- personal application materials, private correspondence, interview notes, or contact lists
- institution-internal documents or unpublished research received privately
- datasets or derived artifacts without a verified reuse/redistribution basis
- personal or sensitive data
- local machine paths, dumps, debug exports, or production logs

## Data rule

Only public, synthetic, or explicitly licensed-for-use data may be committed.

If the provenance or reuse rights of a dataset, image, point cloud, model, or 3D asset are unclear, do not add the asset. Add only a reference to the public source until licensing is verified.

## Environment variables

Use local `.env.local` files. They are ignored by Git.

## Reporting

If a secret or restricted asset is accidentally committed, rotate/revoke the secret first and then remove it from Git history before publication.
