# Tools, plugins, MCP servers and adoption policy

**Priority A — runtime and model conversion**

| Tool | Official URL | Proposed use | Current state |
|---|---|---|---|
| ONNX Runtime | https://onnxruntime.ai/docs/ | CPU inference, execution providers and quantization | Planned, not installed by core |
| Google LiteRT | https://developers.google.com/edge/litert/overview | Android/iOS/Web edge inference and conversion | Planned |
| PyTorch ExecuTorch | https://docs.pytorch.org/executorch/stable/ | PyTorch export and on-device acceleration | Planned |
| Core ML Tools | https://github.com/apple/coremltools | Apple device conversion and validation | Planned; macOS needed for some tests |
| OpenVINO | https://docs.openvino.ai/ | Intel CPU/GPU/NPU inference | Planned |
| llama.cpp | https://github.com/ggml-org/llama.cpp | CPU and supported edge LLM execution | Planned |
| ONNX | https://onnx.ai/ | Model exchange format and opsets | Metadata-only parser working |
| TensorRT | https://docs.nvidia.com/deeplearning/tensorrt/ | NVIDIA edge acceleration | Optional future adapter |
| Apache TVM | https://tvm.apache.org/ | Model compilation | Advanced optional |

**Priority B — measurement, quality and reproducibility**

| Tool | Official URL | Proposed use |
|---|---|---|
| pytest / Node test | https://nodejs.org/api/test.html | Reproducible integration and fixture tests |
| OpenTelemetry | https://opentelemetry.io/ | Traces and resource metrics, opt-in |
| MLPerf Tiny | https://mlcommons.org/benchmarks/tiny/ | Structured tiny ML benchmarking (where compatible) |
| MLPerf Mobile | https://mlcommons.org/benchmarks/mobile/ | Device-specific benchmarks, governed by MLPerf rules |
| Gitleaks | https://github.com/gitleaks/gitleaks | Secrets scanning |
| OSV-Scanner | https://github.com/google/osv-scanner | Dependency checks |
| GitHub Actions | https://docs.github.com/en/actions | CI matrix and release checks |
| Docker / Podman | https://docs.docker.com/ | Optional model conversion sandbox |
| Cosign / Sigstore | https://docs.sigstore.dev/ | Future signed model artifacts |

**Priority C — development agent skills / MCP**

- Portable Agent Skills standard: https://agentskills.io/
- Claude Code / official Agent Skills: https://code.claude.com/docs/en/skills
- GitHub Copilot skills: https://code.visualstudio.com/docs/agent-customization/agent-skills
- MCP official protocol: https://modelcontextprotocol.io/
- MCP Inspector: https://github.com/modelcontextprotocol/inspector
- Context7 documentation MCP: https://github.com/upstash/context7
- Playwright for future dashboard testing: https://playwright.dev/
- Optional local LLM reasoning through Ollama: https://ollama.com/

**Installation policy:** inventory available tools and verify official current versions/licenses before installation; prefer project-local pinned tools. Never globally install without consent, never install every tool unconditionally. External API billing, model downloads, GPU drivers, NPU SDKs, SSH/ADB access, firmware updates, device flashing, telemetry export and global state changes require explicit informed approval. No external AI API key is required by the offline CLI.
