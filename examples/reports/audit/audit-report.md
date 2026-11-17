# EdgeSutra AI — Edge Readiness Audit Report

**Creator:** Vatsal Shah  
**Status:** REVIEW_REQUIRED  
**Integrity:** verified (SHA-256 recomputed)  
**Tool version:** 0.2.1  
**Recorded:** 2026-11-17T17:16:25.810Z  

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
| host-profile.json | 82255e3590789bb5161a2d840b5e2115bf5c7cdca681a1ced46e346f0b61b971 | f415045ed2ac81b5be3f3a4260e208683e82ac220798c6063706ebd569d490b6 |
| compatibility.json | 2a4bb2c9baf1708af3f9adbbc33b9e0b5da35a820c3f1be2688df8b5b8d2b3a5 | d4da6f0546f78b373837db320167c6d47badbc2c214c7bba9134593eefb7a803 |
| conversion-plan.json | 32882eb2c46c05c1db7e849ebaad18babea1bec519d8507ce87b81e5292ef8c9 | a7f25ca36e6bf90bb74c025c5734db54a4849f55313b64d5bff2cf5fb28bf00b |
| benchmark-results.json | 88b10c6568bf0ce6aba8d343004ef76dedda6c10fabeeb6574903e0dac4fef94 | 1a6162f549b8d0741523aba255c1f42ec1fce3f06ed028156b01867d9654352c |

_Human approval is required before any deployment. SHA-256 detects corruption; it is not a signature and does not prove origin._
