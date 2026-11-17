# Operations and release

## Repository
<https://github.com/shahvatsalofficial/edgesutra-ai> · package `edgesutra-ai` · bins `edgesutra`, `edgesutra-ai`.

## CI (`.github/workflows/ci.yml`)
| Job | Content |
|---|---|
| `test` | ubuntu (Node 22/24), windows (22/24), macOS (24): `npm test`, `doctor`, `demo`, `audit` |
| `package` | `npm pack`, install tarball into an empty project, run `--version`, `doctor`, `audit` |
| `secrets-scan` | Fails on committed token patterns |

## Release checklist
1. `npm test && npm run proof && npm run audit`
2. Bump `package.json`, `.claude-plugin/plugin.json`, `CITATION.cff`, `CHANGELOG.md`.
3. Commit, tag `vX.Y.Z`, push tag → `release.yml` publishes with provenance (needs `NPM_TOKEN` secret or npm trusted publishing configured for the repo).
4. Create the GitHub release with `audit-report.html` and `SHA256SUMS.txt` attached.
5. Verify: `npx edgesutra-ai@X.Y.Z --version` in a clean directory.

## Versioning and deprecation
Semantic versioning. JSON `schemaVersion` is bumped on breaking artifact changes with one minor release of overlap.

## Support
Best effort via GitHub Issues. No SLA.
