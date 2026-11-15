# EdgeSutra AI — compatibility

**Status:** STATIC_PLAUSIBLE_UNVERIFIED  
**Evidence:** static_only  
**Recorded at:** 2026-11-10T20:42:22.193Z

## Static checks

| Check | Status | Notes |
|---|---|---|
| operator-allowlist | static_match | All operators appear in supplied allowlist; actual execution still unverified |
| onnx-opset | static_match |  |
| ram-fit-estimate | unknown | ONNX file bytes do not establish inference memory |
| platform | static_match | User-supplied declared platform only |

> Static matches, imported benchmarks and proposed conversions do not prove actual device compatibility.
