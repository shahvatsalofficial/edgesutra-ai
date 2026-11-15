# EdgeSutra AI roadmap

**P0 — working offline starter:** bounded ONNX metadata extraction, manifest/static compatibility, non-executing conversion plan, local toy FP32/INT8-simulation benchmark, evidence reports, skill definitions, installers, localhost API and automated tests.

**P1 — real runtime:** official ONNX Runtime CPU execution on consented test fixtures, ONNX operator type/version validation, onnxruntime quantization, accuracy parity tests, isolated conversion process. Verified actual model inference needed to upgrade readiness.

**P2 — devices:** Android LiteRT, iOS Core ML, PyTorch ExecuTorch, OpenVINO, llama.cpp. Discover runtime capabilities, avoid unsupported target claims, measure cold/warm latency and peak memory on attached devices. Device farm and OS CI need actual execution.

**P3 — research and enterprise:** device fleet jobs, calibrated quantization, artifact signing/SBOM, energy and thermal sensors, A/B accuracy datasets, secure server/API, accessible dashboard, managed tenancy, observability, release gates and developer docs.

**P4 — community:** comprehensive examples, hardware support matrix with real evidence, documentation translations, governance, changelogs, responsible disclosure and public release readiness.
