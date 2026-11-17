# Roadmap and FAQ

## Roadmap
| Phase | Goal | Exit evidence |
|---|---|---|
| P0 ✅ | Offline core, audit reports, tests, docs | This release |
| P1 | Real ONNX Runtime CPU smoke inference on a redistributable model; host latency and RSS | Pinned runtime, model hash, logs |
| P2 | Isolated quantization adapter with held-out quality deltas | Baseline vs candidate outputs, sample counts |
| P3 | One read-only Android/Linux device connector | `MEASURED_ON_DEVICE` evidence with device identity |
| P4 | LiteRT, ExecuTorch, llama.cpp adapters | Per-adapter fixtures and device proof |
| P5 | Signed evidence, dashboard, optional authenticated server | Independent review |

## FAQ
**Is this a new inference framework?** No. It audits claims about existing ones.

**Does it run my model?** No. It reads ONNX metadata and never executes a model.

**Why is the benchmark a toy?** It validates the measurement harness and statistics honestly without downloads. Real-runtime benchmarks are P1.

**Can it say my model works on a Raspberry Pi?** Only as `STATIC_MATCH` from your declarations, plus an explicit `NOT_RUN` for the device.

**Which IDEs are verified?** Files are installed to each IDE's documented skills path. Native discovery has not been independently verified.

**Is the report signed?** No. SHA-256 only. Signing is planned.

**Will you add telemetry?** No default telemetry; any future opt-in will be documented first.
