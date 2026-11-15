# Evidence hierarchy and quality gates

- **Observed in approved device run**: signed test record including device ID, model artifact hash, runtime version, backend, input set hash, clock, warmups, latency samples, environment and quality metric.
- **Imported measurement**: statistically summarized but provenance must be separately assessed; never present as own observed run.
- **Static inference**: parser, source snapshot or capability allowlist. Useful for finding reasons to block, insufficient for declaring runtime support.
- **Estimate**: explicit modeled assumptions, with uncertainty and calibration evidence.
- **Proposed / not run / unknown**: never score as verified.

Quality gate: compare same actual device, input set and runtime, report both task-quality delta and p50/p95 latency, plus memory/power only when measured. Distinguish accuracy drop from speed improvement. If missing quality tests, block production readiness. Do not manufacture watts or emissions.
