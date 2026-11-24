# EdgeSutra AI — Edge Readiness Audit Report

**Creator:** Vatsal Shah  
**Status:** REVIEW_REQUIRED  
**Integrity:** verified (SHA-256 recomputed)  
**Tool version:** 0.2.2  
**Recorded:** 2026-11-24T19:48:47.517Z  

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
| host-profile.json | 7b14ac9b781048d084abc850c76417059ed519fcceb3f671739055f270495728 | c1650c93f612225424f2a33d5916c07066800f07dd98b42ee053bc78bdc29ae1 |
| compatibility.json | 2a4bb2c9baf1708af3f9adbbc33b9e0b5da35a820c3f1be2688df8b5b8d2b3a5 | d4da6f0546f78b373837db320167c6d47badbc2c214c7bba9134593eefb7a803 |
| conversion-plan.json | 32882eb2c46c05c1db7e849ebaad18babea1bec519d8507ce87b81e5292ef8c9 | a7f25ca36e6bf90bb74c025c5734db54a4849f55313b64d5bff2cf5fb28bf00b |
| benchmark-results.json | 8bce89f5d967c66982287a98ebe964d6cda81938ff02dd7edceab8ed513f373c | 28b4bce6b03a2b1984b708309acffb0183fb749ae6ea8bb4bbace94a1915173a |

_Human approval is required before any deployment. SHA-256 detects corruption; it is not a signature and does not prove origin._
