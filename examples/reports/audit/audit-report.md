# EdgeSutra AI — Edge Readiness Audit Report

**Creator:** Vatsal Shah  
**Status:** REVIEW_REQUIRED  
**Integrity:** verified (SHA-256 recomputed)  
**Tool version:** 0.2.0  
**Recorded:** 2026-11-15T19:09:06.065Z  

> **Verdict: REVIEW_REQUIRED** — BLOCKED on any failed static check; REVIEW_REQUIRED otherwise; GO_CANDIDATE needs verified on-device evidence plus human sign-off, which this tool cannot produce.

**Model:** toy-dense-model-v1  
**Device:** fictional-arm64-prototype  
**Runtime:** toy-js  
**Inputs:** bundled-synthetic-fixtures  
**Static compatibility:** STATICALLY_COMPATIBLE  
**Environment:** Node v24.15.0 · win32/x64  

## Findings

| ID | Severity | Finding | Detail |
|---|---|---|---|
| ES-UNKNOWN-REAL-DEVICE-EXECUTION | review | Unverified: real-device-execution | No model execution or performance measurement on this target has occurred |
| ES-NOT-RUN-DEVICE | review | No target-device execution | No model was executed on the target device. Static manifest checks and a host-only toy benchmark do not prove device support. |
| ES-NOT-MEASURED-ENERGY | info | Energy, carbon and peak memory not measured | Reported as NOT_MEASURED; never estimated or substituted. |
| ES-SYNTHETIC-INPUT | info | Bundled synthetic fixtures used | Manifests are declared claims, not observations. |

## Evidence tiers

| Artifact | Tier | Proves | Does not prove |
|---|---|---|---|
| compatibility.json | STATIC_MATCH | Declared model/runtime/device contracts agree or disagree | That the model runs on the device |
| benchmark-results.json | MEASURED_HOST_ONLY | A toy Node.js model ran on this host CPU with timed samples | Target-device latency, energy, peak memory or edge-runtime behavior |
| conversion-plan.json | NOT_RUN | A reviewable plan exists | That any conversion was executed |

## Not tested

- Physical or virtual target-device inference
- ONNX Runtime / LiteRT / ExecuTorch execution
- Quantized-model task quality on held-out data
- Energy, thermal and battery behavior
- Offline reliability under interruption
- Package signing and provenance beyond SHA-256

## Artifact hashes

| File | SHA-256 | Embedded integrity |
|---|---|---|
| host-profile.json | 0588dfb520f0d2a736cc3822c8d9845cdb47d24e5f2e03ad7f10b56ee429a166 | 5aa680343174951646a58acff6a8bfb4cfe918ab30fd33323d4ae3a0c54c2a12 |
| compatibility.json | 2a4bb2c9baf1708af3f9adbbc33b9e0b5da35a820c3f1be2688df8b5b8d2b3a5 | d4da6f0546f78b373837db320167c6d47badbc2c214c7bba9134593eefb7a803 |
| conversion-plan.json | 32882eb2c46c05c1db7e849ebaad18babea1bec519d8507ce87b81e5292ef8c9 | a7f25ca36e6bf90bb74c025c5734db54a4849f55313b64d5bff2cf5fb28bf00b |
| benchmark-results.json | b6a6158b9d6374b0b4fd8c1d7d6e56093383f5db108dd25338b6a2a7b07f5313 | af082c78f4eb2df6ab71b91a067bc493208223a063e340e6cb106d0e81318406 |

_Human approval is required before any deployment. SHA-256 detects corruption; it is not a signature and does not prove origin._
