# Third-party notices

| Item | Included? | Notes |
|---|---|---|
| npm runtime dependencies | None | `package.json` declares no `dependencies`. Only Node.js built-ins are used. |
| Model weights / datasets | None | `fixtures/models/*.onnx` are tiny synthetic protobuf files authored for tests. |
| Fonts / images / scripts in HTML reports | None | Reports are self-contained, with inline CSS and no external requests. |
| Referenced projects | Referenced, not bundled | ONNX Runtime (MIT), LiteRT (Apache-2.0), ExecuTorch (BSD-style), llama.cpp (MIT), Core ML Tools (BSD-3), OpenVINO (Apache-2.0). Verify each license before you add an adapter; none is distributed here. |

When a future adapter adds a dependency, this file, `NOTICE` and the SBOM in the release must be updated in the same pull request.
