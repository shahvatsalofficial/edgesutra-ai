# Installation and local report service

No global installs required. Node.js >=22 is required. `npm test`, `npm run demo`. For project-local skills: `node packages/cli/index.mjs install --ide claude --project /some/checked-out/repository`. Check the requested IDE conventions and permissions first.

Server requires `EDGESUTRA_REPORT_TOKEN` set to a random secret of length >=24, and binds only to loopback. `GET /health` and `GET /reports/<simple-name>.json` require `Authorization: Bearer <token>`; all writes rejected. Server is not production ready and must not be reverse-proxied publicly.
