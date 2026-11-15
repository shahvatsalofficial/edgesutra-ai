# Plugins, Skills, MCP, Runtimes and Tools Catalog

**No plugin or optional runtime has been installed by this starter.** Before installation, Claude should inspect environment, select current maintained versions, check licenses, privilege requirements and user consent. Prefer project-local, pinned, reversible setups.

| Tool | Phase | Purpose | URL |
|---|---|---|---|
| ONNX Runtime | P1 | Verified runtime loading, EP and operator testing | https://onnxruntime.ai/docs/ |
| ONNX Python | P1 | Full ONNX semantic checker, graph shapes and external tensors | https://onnx.ai/onnx/ |
| Netron | P1 | Graph visualization | https://netron.app/ |
| pytest | P1 | Optional Python adapter tests | https://docs.pytest.org/ |
| uv | P1 | Reproducible optional Python toolchain | https://docs.astral.sh/uv/ |
| LiteRT 2.x | P2 | Google's on-device conversion/runtime, CompiledModel API | https://developers.google.com/edge/litert/ |
| ExecuTorch stable | P2 | PyTorch mobile/embedded runtime | https://docs.pytorch.org/executorch/stable/ |
| llama.cpp | P2 | GGUF and local LLM edge benchmarks | https://github.com/ggml-org/llama.cpp |
| OpenVINO | P2 | Intel edge CPU/NPU optimization | https://docs.openvino.ai/ |
| TVM | Later | Compiler research | https://tvm.apache.org/ |
| Android ADB | P2 | Consent-bound device test transport | https://developer.android.com/tools/adb |
| Xcode Instruments | P2 | Apple device metrics (requires macOS) | https://developer.apple.com/xcode/ |
| Power sensor adapter | P2 | Physical or device-supported energy readings | Device-specific documentation |
| Docker/Podman | P1 | Sandboxed conversion/test workers | https://www.docker.com/ |
| Gitleaks | P0/P1 | Secret scanning | https://github.com/gitleaks/gitleaks |
| OSV-Scanner | P0/P1 | Vulnerability review | https://github.com/google/osv-scanner |
| OpenTelemetry | Later | Trace execution and device test jobs | https://opentelemetry.io/ |
| GitHub Actions | P0 | Cross-OS CI | https://docs.github.com/en/actions |
| MCP official SDK / Inspector | Optional | Host and tool interoperability diagnostics | https://modelcontextprotocol.io/ |
| Claude Skills / agents | Optional | Local host-specific orchestration | https://docs.anthropic.com/ |
| Context7 | Optional | Versioned up-to-date library docs | https://github.com/upstash/context7 |
| Playwright | Later | Dashboard accessibility and UI E2E | https://playwright.dev/ |

Avoid heavyweight SDK bundles for the no-key core. Never download licensed model weights or alter device/driver/firmware configurations automatically.
