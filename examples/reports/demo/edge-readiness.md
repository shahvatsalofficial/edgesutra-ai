# EdgeSutra AI — compatibility-report Report

**Creator:** Vatsal Shah  
**Status:** STATICALLY_COMPATIBLE  
**Integrity:** verified (SHA-256 recomputed)  

**Model:** toy-dense-model-v1  
**Device:** fictional-arm64-prototype  
**Runtime:** toy-js  
**Device execution:** NOT_RUN  

| Check | Result | Evidence |
|---|---|---|
| model-format | pass | Model toy-json; runtime toy-json |
| operators | pass | All declared operators listed by runtime |
| precision | pass | Model float32; runtime float32, int8 |
| memory-estimate | pass | Declared 64 MB; available 256 MB |
| architecture | pass | Target arm64; runtime any |
| os | pass | Target linux; runtime linux, windows, darwin |
| runtime-present | pass | Target manifest claims runtime installed; not executed |
| real-device-execution | unknown | No model execution or performance measurement on this target has occurred |

_Static manifest-based checks only. Does not parse ONNX graph or certify an actual edge device._

# EdgeSutra AI — toy-benchmark Report

**Creator:** Vatsal Shah  
**Status:** HOST_ONLY_TEST  
**Integrity:** verified (SHA-256 recomputed)  
**Recorded:** 2026-11-15T19:02:13.171Z  

**Actual execution location:** host-a4e38df95a-win32-x64  
**Target device:** NOT_TESTED  
**Energy:** NOT_MEASURED  
**Carbon:** NOT_MEASURED  

| Variant | Median wall-clock (ms) | p95 (ms) |
|---|---|---|
| float32 | 0.6332 | 0.8096 |
| int8-sim | 0.6084 | 0.7123 |

**Quality MAE:** 0.00023884  
**Max abs error:** 0.0017877  

## Limitations

- Small synthetic dense layer, not ONNX/LiteRT/CoreML/ExecuTorch execution
- Process RSS is after-run and not model-exclusive or peak usage
- Wall-clock timings do not establish energy, speed on a target device or optimized performance
