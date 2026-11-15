# Audit reports (Markdown + HTML + JSON)

```bash
edgesutra audit --out ./edge-audit [--model m.json --device d.json --runtime r.json | --onnx model.onnx] [--runs 5 --iterations 60 --inputs 16]
```

| File | Purpose |
|---|---|
| `audit-report.html` | Human-readable, self-contained, responsive, light/dark. Share this. |
| `audit-report.md` | Same content for PRs, wikis, chat. |
| `audit-report.json` | Machine-readable, sealed with SHA-256 integrity (`edgesutra verify --input`). |
| `host-profile.json`, `compatibility.json`, `conversion-plan.json`, `benchmark-results.json`, `model-inspection.json` | Underlying artifacts. |
| `SHA256SUMS.txt` | `sha256sum -c`-style checksums of every file written. |

## Sections
1. **Verdict** — `BLOCKED` (any failed static check) or `REVIEW_REQUIRED`. `GO_CANDIDATE` is unreachable without verified on-device evidence and human sign-off, which this tool cannot supply.
2. **Findings** — stable IDs (`ES-COMPAT-*` blockers, `ES-UNKNOWN-*` review items, `ES-NOT-RUN-DEVICE`, `ES-NOT-MEASURED-ENERGY`, `ES-SYNTHETIC-INPUT`).
3. **Evidence tiers** — per artifact: tier, what it proves, what it does not.
4. **Not tested** — explicit list.
5. **Artifact hashes** — SHA-256 of each artifact and its embedded integrity value.

## CI gate
```yaml
- run: npx edgesutra-ai audit --out audit --model model.json --device device.json --runtime runtime.json
# exit 1 => BLOCKED, fails the job
```
