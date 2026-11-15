# IMPLEMENTATION STATUS — EdgeSutra AI v0.2.0

| Capability | Verified starter status | Notes |
|---|---|---|
| Host CPU/OS/RAM profile | Working locally | GPU/NPU/storage not probed; does not inspect target devices |
| ONNX metadata inspection | Working locally | Protobuf metadata only; max 32 MiB; **not** inference or semantic validation |
| Static model/device/runtime contract | Working locally | Relies on declared manifests and supported subset only |
| Conversion/quantization plan | Working (plan only) | No ONNX model conversion |
| Real local toy model execution | Working locally | Deterministic tiny dense layer on *this host's* Node.js CPU |
| Int8 weight simulation / quality comparison | Working locally | Not optimized hardware int8 execution |
| Latency / process CPU / post-run RSS | Working locally | Not target-device latency, energy or peak memory |
| Integrity hash and reports | Working locally | SHA-256 checksum, **not** signed provenance |
| 20 specialist `SKILL.md` files | Authored | Instructions only; autonomous role activation untested |
| Project-local skill installer | Working for listed path conventions | Native IDE loading not independently verified; symlink-refusal tests skip on hosts that forbid symlinks |
| Local read-only authenticated report server | Working locally | 127.0.0.1 only, not enterprise-ready |
| Audit report (JSON + MD + HTML + SHA256SUMS) | Working locally | `edgesutra audit`; verdict BLOCKED or REVIEW_REQUIRED only |
| CI workflows Windows/macOS/Linux | Configured and run on GitHub | See Actions history; macOS runs Node 22 only |
| Full ONNX Runtime/LiteRT/ExecuTorch/Core ML | **Planned** | Requires official adapters and tests |
| Physical target-device inference | **NOT_TESTED** | Explicit device, runtime and model evidence required |
| Energy/thermal/battery measurements | **NOT_MEASURED** | Sensor integrations planned |
| Production remote server/dashboard | **Planned** | Auth, isolation, tenancy and permissions needed |

**No model downloads, cloud APIs, firmware writes, or live remote connections are required or performed by the starter.**
