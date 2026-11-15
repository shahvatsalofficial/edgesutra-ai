# Evidence and benchmark semantics

- `model-inspection`: observable raw ONNX metadata and SHA-256; parser does not validate graph correctness or run inference.
- `compatibility-report`: requires explicitly supplied model, device and runtime manifests. Failing declared requirements -> `INCOMPATIBLE`; unknowns -> `REQUIRES_VERIFICATION`; all known pass -> `STATICALLY_COMPATIBLE`. This does not imply actual model success.
- `conversion-plan`: `conversionExecuted=false` and every step `PLANNED`.
- `toy-benchmark`: actual host Node.js inference samples; metrics include p50/p95/mean/min/max elapsed time, process CPU samples, after-run process RSS and float-vs-int8-simulation output MAE. Target device `NOT_TESTED`; energy, carbon, peak RAM `NOT_MEASURED`.
- `benchmark-comparison`: validates workload hashes, iteration count and coarse host identity; even matched comparisons are `COMPARABLE_WITH_CAVEATS` and not statistically conclusive.
- Integrity hash: SHA-256 over stable JSON fields; not an authenticity signature or anti-tamper guarantee against an attacker who rewrites entire report.

Never use unsupported numeric values (zero) to represent unknown energy or latency; mark them unknown or not measured. Real edge-device benchmarks must record device ID (privacy-safe), OS, runtime, model hash, warm/cold samples, calibration dataset reference, tested quality, sensor scope, resource budget and result provenance.
