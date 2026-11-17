# Glossary

| Term | Meaning |
|---|---|
| Edge AI | Running model inference on or near the device that produces the data |
| ONNX | Open model exchange format; operators and opsets define graph semantics |
| Operator / opset | A graph node type and the versioned set of operator definitions |
| Quantization | Lower-precision weights/activations (e.g., INT8). A label, not a guaranteed speed-up |
| Static match | Declared manifests agree; no execution occurred |
| Host-only | Measured on the machine running the tool, not the target |
| Evidence capsule | A reviewable bundle of artifacts, hashes and limits |
| Integrity hash | SHA-256 over canonical JSON; detects change, not forgery |
| Skill | A `SKILL.md` instruction package a host AI agent can load |
| Verdict | Release-gate outcome: `BLOCKED`, `REVIEW_REQUIRED` (`GO_CANDIDATE` reserved) |
| `NOT_RUN` / `NOT_MEASURED` | Explicitly absent evidence; never zero |
