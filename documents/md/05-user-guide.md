# User guide

## 1. Requirements
Node.js 22 or newer. Nothing else: no API key, no network, no GPU.

## 2. Your first audit (2 minutes)
```bash
npx edgesutra-ai audit --out ./edge-audit
```
Open `edge-audit/audit-report.html`. The sample inputs are bundled synthetic fixtures; the report says so (`ES-SYNTHETIC-INPUT`).

## 3. Audit your own model
Create three small JSON manifests (see [Technical reference](04-technical-reference.html)), then:
```bash
npx edgesutra-ai audit --out ./edge-audit --model model.json --device device.json --runtime runtime.json
```
Or inspect a real ONNX file and audit its operators:
```bash
npx edgesutra-ai audit --out ./edge-audit --onnx ./model.onnx
```

## 4. Read the report

@@diagram:pipeline@@

| Section | How to use it |
|---|---|
| Verdict | `BLOCKED` = stop; `REVIEW_REQUIRED` = continue, but a human must collect on-device evidence |
| Findings | Fix `blocker`s first; each `review` item is a missing piece of evidence |
| Evidence tiers | Tells you which artifact is static, host-only or planned |
| Not tested | Your to-do list before release |
| Artifact hashes | Compare with `SHA256SUMS.txt` to prove the files were not altered |

## 5. Use in CI

@@diagram:ci@@

```yaml
- run: npx edgesutra-ai audit --out audit --model m.json --device d.json --runtime r.json
- uses: actions/upload-artifact@v4
  with: {name: audit, path: audit}
```
Exit code 1 fails the job when a static check fails.

## 6. Verify a report you received
```bash
npx edgesutra-ai verify --input audit-report.json     # exit 2 if altered
```

## 7. Install the agent skills
```bash
npx edgesutra-ai install --ide claude --project .
```
The command never overwrites. Then ask your agent: "use EdgeSutra Prime to review this model's edge readiness". Skill discovery depends on your IDE; it is not guaranteed by file copy alone.

## 8. See it on real situations

Seven worked examples with real output are in [Real-world scenarios](14-real-world-scenarios.html).

## 9. Common questions
- *Why REVIEW_REQUIRED and never "OK"?* Nothing here executes on your device.
- *Can I trust the benchmark numbers?* They are real timings of a toy model on this host, useful for instrumentation, not for device decisions.
- *Does it upload anything?* No.
