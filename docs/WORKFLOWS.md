# Workflows

- **Device Profile Workflow:** Inspect local host and approved target manifests; distinguish observed host data from user-declared device capabilities. Evidence: device-profile.json and unprobed fields.
- **ONNX Metadata Inspection:** Inspect allowed ONNX metadata with bounded parser, hash file, enumerate declared operators/opsets; do not execute untrusted model. Evidence: model-inspection.json and file SHA-256.
- **Operator & Runtime Contract Audit:** Compare explicitly declared formats/operators, memory and OS/architecture support; unknown information blocks verified claims. Evidence: compatibility.json with static-only verdict.
- **Quantization & Conversion Plan:** Generate planned tooling/calibration/conversion/testing steps; no conversion performed. Evidence: conversion-plan.json with planned stages.
- **Host Toy Benchmark:** Run deterministic small dense model FP32/INT8 simulation on current host; record actual sample timings and quality error. Evidence: benchmark-results.json and host identity.
- **Quality & Regression Gate:** Compare equivalent workloads, compute task output differences, reject unknown quality metrics. Evidence: comparison.json and regression verdict.
- **Real Target Device Validation:** After explicit consent: discover device, run official runtime model, measure latency/memory/quality with device metadata. Evidence: verified device-specific evidence (future).
- **Audit and Release:** Perform independent evidence review, security scanning, provenance, signed artifacts and human approval. Evidence: release-readiness.md with verified/unverified statuses.

Controlled runbooks are in `workflows/*.json`. Approval gates are mandatory for model downloads, executable conversion tools, physical device writes, shell access and deployment.
