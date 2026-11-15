# Architecture

## Context
Developer enters local model file/manifest, an explicitly declared edge device capability profile, and a runtime capability manifest. Offline CLI inspects safely, produces a compatibility evidence tier, outputs conversion roadmap and optionally benchmarks an independent toy CPU workload. Maintainers can independently check hashes and compare runs.

## Layers
- **Experience:** CLI + Markdown/HTML/JSON reports; future responsive web dashboard.
- **Agent interface:** 20 canonical `SKILL.md` and matching Claude specialist instructions. Client orchestrators remain host-specific.
- **Domain model:** versioned device, runtime, ONNX metadata, compatibility, quantization plan, benchmark and quality data contracts.
- **Engine:** bounded metadata parser and deterministic static checks, actual host-only Node.js toy model inference.
- **Integration:** official SDK adapters in future (`onnxruntime-node`, LiteRT, ExecuTorch, Core ML, OpenVINO, llama.cpp), with explicit capability detection.
- **Security:** offline read-only defaults, bounded parsing, no dynamic model execution, no shell or privileged probing, local bearer-token GET server.
- **Persistence:** signed/hashed future artifacts; currently JSON files with integrity hash. Large model weights are not stored.
- **Evidence:** explicitly distinguish `STATICALLY_COMPATIBLE`, `INCOMPATIBLE`, `REQUIRES_VERIFICATION`, `HOST_ONLY_TEST`, `NOT_TESTED`, `NOT_MEASURED`.
- **Deployment:** local CLI; GitHub Actions CI matrix configured (not executed), optional future authenticated remote API/server.

## Core workflows
ONNX metadata → manifest audit → conversion plan → authorized runtime test → task quality evaluation → target-device performance → release gate. The starter implements metadata, manifest audit, planning, and an independent host-only toy benchmark, not physical target-device validation.

## Next architecture decisions
Use official capability/driver APIs, signed artifacts with provenance, isolated benchmark execution, strict model parsing limits, human approvals before external/hardware action, opt-in telemetry, offline-first privacy and reproducible fixture-based CI.
