# EDGESUTRA AI — THE UNIVERSAL EDGE MODEL INTELLIGENCE, QUANTIZATION & DEVICE RELIABILITY ENGINEERING PLATFORM

**Author and original creator:** Vatsal Shah  
**Proposed public identity:** EdgeSutra AI  
**Primary orchestrator:** EdgeSutra Prime  
**Tagline:** *Measure on Devices. Prove Every Trade-off.*  
**Repository:** `edgesutra/`  
**CLI:** `edgesutra`  
**Proposed package:** `@vatsalshah/edgesutra` (verify first)  
**License:** Apache-2.0 for original project code; audit third-party licenses  
**Date:** 11 November 2026

> **CLAUDE CODE MASTER INSTRUCTION — EXECUTE REAL DEVELOPMENT.** Read this document completely before editing. Inspect the existing root repository and preserve verified working code. You are not asked to invent a perfect system in prose: deliver tested, secure, extensible implementation milestones and publish an honest capability matrix. The existing project is an offline-first starter, not a completed edge hardware/cloud platform.

## 0. Mission, outcomes, boundaries

Build a best-in-class open-source **Edge AI Compatibility, Conversion Planning, Quantization Validation, Performance & Reliability Intelligence** platform that can be used from supported AI IDEs, CI pipelines, servers and real hardware labs. Primary users are IoT and embedded engineers, mobile AI application developers, on-device inference practitioners, model engineers, engineering leaders and open-source maintainers. Help people choose a model/runtime/device combination using explicit capabilities, then run reproducible, authorized experiments to measure latency, memory, throughput, quality, cold start, energy and offline reliability. **Never** claim that a static model file, estimated memory footprint, model marketing label or simulator result proves that a model runs on actual edge hardware.

The product's promised value is a reproducible, reviewable **evidence capsule**, not AI-generated optimism. Its flagship experiences should include:

1. **EdgeFit Matrix** — one model, multiple device/runtime/backends; cells show *measured passed*, *measured failed*, *static plausible*, *blocked*, *not run*, or *unknown*, with source and version.
2. **QuantizeProof** — validates file/precision conversion with pre/post task quality on held-out inputs, actual on-device p50/p95 latency, memory and measured power where possible.
3. **Delegate Doctor** — diagnoses runtime/operator partitions, accelerator fallbacks, custom ops and unsupported delegates.
4. **Edge Repro Capsule** — redacted model hash, device identity, toolchain versions, input suite hash, actual outputs, sampling settings, limitations and a replay procedure.
5. **OfflineProof** — tests whether on-device inference continues under disabled networking, app restarts, low-memory conditions and interrupted workloads.
6. **SafeDeploy Review** — output artifact signing, package size, permissions, upgrade/rollback prerequisites and required human approvals.

Do not misrepresent this as a new inference framework. **Integrate maintained official engines** such as ONNX Runtime, LiteRT, ExecuTorch and llama.cpp, using documented, versioned adapters.

## 1. Inspect and preserve the existing project

The root project already contains a Node.js no-key CLI, project-local skills, an optional localhost report endpoint, deterministic manifest compatibility checks, an ONNX protobuf *metadata-only* inspector with a file-size limit, a proposed conversion plan and a tiny JavaScript CPU benchmark. The benchmark is an actual host-local calculation but **not actual ONNX, mobile, NPU, GPU, embedded or MCU inference**. Some fixtures are synthetic. The current automated test suite covers these existing abilities; do not assert its count until you run `npm test` yourself.

Start by listing the full file tree and `package.json`, reading `README.md`, `docs/STATUS.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY_MODEL.md`, `docs/EVIDENCE_AND_QUALITY.md`, `docs/IDE_COMPATIBILITY.md`, `docs/PLUGINS_AND_MCP.md`, and all source code and tests. Run `node --version`, `npm test`, `npm run doctor`, and `npm run demo`. Record actual versions, machine, observed output, errors and feature limits. Identify any discrepancies between docs, CLI flags, tests, README and real behavior, and repair them before adding new features. Do not delete passing tests or weaken validation.

Use a requirements traceability ledger with references to the original **AI-015 EdgeSutra AI** product specification: device profiling; operator/architecture validation; reproducible conversion plans; real smoke tests where hardware is available; separate quality and performance comparison; server/IDE paths; explicit approval controls; no invented measurements.

## 2. Role hierarchy, 20 specialist agents

Provide the following roles, each with `SKILL.md`, explicit inputs/outputs, permission boundaries, versioned evidence schema and clearly scoped tools. Ship matching Claude Code subagent definitions only when verified against the current Claude Code format. In unsupported hosts use **sequential single-agent fallback** rather than fabricating parallel multi-agent execution.

| Role | Responsibility | Primary artifact |
|---|---|---|
| **Prime** | Orchestration/architecture/human release decisions | `edgesutra-prime` skill and evidence |
| **Device Atlas** | OS/CPU/memory and target hardware profiles | `edgesutra-device-atlas` skill and evidence |
| **Silicon Scout** | GPU/NPU/DSP hardware capability claims | `edgesutra-silicon-scout` skill and evidence |
| **Runtime Bridge** | ONNX Runtime / LiteRT / ExecuTorch runtime compatibility | `edgesutra-runtime-bridge` skill and evidence |
| **Model Cartographer** | Model graph, metadata, license and source hashes | `edgesutra-model-cartographer` skill and evidence |
| **Operator Sentinel** | Operator and opset compatibility gates | `edgesutra-operator-sentinel` skill and evidence |
| **Graph Surgeon** | Graph transforms and runtime partitions (future) | `edgesutra-graph-surgeon` skill and evidence |
| **Quantization Alchemist** | Quantization planning and precision tradeoffs | `edgesutra-quantization-alchemist` skill and evidence |
| **Calibration Steward** | Representative calibration data and permission | `edgesutra-calibration-steward` skill and evidence |
| **Quality Witness** | Pre/post task quality and regression | `edgesutra-quality-witness` skill and evidence |
| **Latency Lab** | Warm/cold latency, throughput and timing distributions | `edgesutra-latency-lab` skill and evidence |
| **Memory Guardian** | Weights, activations and RAM headroom | `edgesutra-memory-guardian` skill and evidence |
| **Energy Boundary** | Measured vs estimated power and battery evidence | `edgesutra-energy-boundary` skill and evidence |
| **Thermal Observer** | Clock throttling and thermal controls | `edgesutra-thermal-observer` skill and evidence |
| **Offline Guardian** | Connectivity-independent edge execution | `edgesutra-offline-guardian` skill and evidence |
| **Artifact Provenance** | Model/toolchain/dataset identity and reproducibility | `edgesutra-artifact-provenance` skill and evidence |
| **Deployment Gate** | Human-approved package/release/rollback review | `edgesutra-deployment-gate` skill and evidence |
| **IDE Bridge** | Portable SKILL.md installation and host compatibility | `edgesutra-ide-bridge` skill and evidence |
| **Security Sentinel** | Untrusted model, device and supply-chain security | `edgesutra-security-sentinel` skill and evidence |
| **Release Auditor** | Independent verification, unknowns and quality gates | `edgesutra-release-auditor` skill and evidence |

Do not permit Prime or any role to bypass human approval, assume an installed plugin, claim a passing device test with only a fixture, or publish secrets. Agents are tasks/skill instructions, not cloud inference entitlements.

## 3. All software architecture levels

Create or refine ADRs and diagrams for every relevant architectural layer:

- **Business/domain:** personas, bounded contexts, operator and model ownership, compliance objectives, costs, value proposition.
- **Experience:** CLI information hierarchy, accessible dashboard, device/model selector, clear status and evidence badges, responsive mobile/desktop views.
- **Information/data:** versioned JSON Schema/Protobuf contracts, device identity, model identity, runtime version, samples, energy source, quality scores, evidence status, audit logs and retention policy.
- **Application/services:** pure core evaluator, parser adapters, conversion planner, benchmark controller, report generation, update checker, plugin registry, host-adapter interfaces.
- **Execution:** local sandbox worker, adapter permission model, CPU/memory/time/network limits, process lifecycle, idempotency, cancellation, retries and model-download boundaries.
- **Device:** Android, iOS, Windows, macOS, Linux, Raspberry Pi, embedded and MCU adapters with *different* capability contracts and test readiness; no universal device promises.
- **AI inference:** model loader, EP/delegate discovery, operator partition analysis, warm-up, inputs, expected outputs, quality evaluation, performance sampling.
- **Security/privacy:** supply chain, model provenance, secret storage, role-based authorization, tenant boundaries, privacy defaults, documented threat model.
- **Server and operations:** optional authenticated API, job queues, scheduling, rate limits, result stores, observability, backups, audit history, incident response and server-side cost controls.
- **Quality, release and governance:** comprehensive CI/CD, SAST, dependency scanning, multi-OS smoke tests, signed artifacts, support policy, deprecation policy, contributor documentation and release checklist.

Every architecturally significant choice needs a clear rationale, risks, alternatives, validation plan and fallback. Do not create unnecessary microservices: keep the offline core small and dependency-light. Separate optional Python/runtime/device/server modules only where justified.

## 4. Strict evidence tiers and language

All outputs must explicitly distinguish:

- `MEASURED_ON_DEVICE`: tool executed on a named physical/virtual target, runtime and versions recorded, logs and samples exist. Mark a virtual device as *virtual*, not a physical device.
- `MEASURED_HOST_ONLY`: benchmark actually ran on current host CPU/GPU; **not** validated on target edge hardware.
- `IMPORTED_MEASUREMENT`: source-supplied samples with provenance or uncertain attestation; do not rebrand as newly measured by this tool.
- `STATIC_MATCH`: claims match manifests/declared operator allowlists; does not prove runtime support.
- `MODELED_ESTIMATE`: based on explicit assumptions and equations; cannot be labeled measured energy or carbon.
- `NOT_RUN`, `UNKNOWN`, `BLOCKED`, `FAILED` and `HUMAN_REVIEW_REQUIRED`.

Use a default-deny evidence gate. A run without device identity, model content hash, runtime backend, input hash, sufficient samples or quality metric is not a release-validation run. Model binaries with the same name but different bytes are different artifacts. Static allowlists may be stale. Do not claim that reduced file size means faster inference, lower RAM or lower energy consumption. Make warnings visible in CLI JSON, Markdown, HTML and future dashboards.

## 5. Device identity and inventory

Develop an opt-in device profiling adapter with versioned schema for OS/architecture, processor details, RAM, available memory, storage, accelerators and drivers, runtime availability and battery/thermal capabilities. Capture source of each reading, timestamp, device UID policy, version and confidence. For unsupported platforms, report unknown without speculative classification. Separate on-host `os` API results from Apple Instruments, ADB, Android Health/PowerStats, vendor NPUs, Linux sysfs and embedded target APIs. Do not reveal serial numbers or personally identifying device identifiers by default; generate pseudonymous IDs where appropriate.

Device checks must be read-only by default. A device CLI must never silently flash firmware, enable USB debugging, install drivers, change clocks, wipe directories, disable protections, expose ports or upload user model weights. Require scoped explicit approval and an abort path for each hazardous operation.

## 6. Model parser and metadata integrity

Begin with the shipped bounded ONNX protobuf metadata parser. Test malformed/truncated inputs, UTF-8 failures, unknown fields, excess nodes, overlong varints, symlink inputs, size limits and external-data handling. Expose `inspectionTier=metadata_only`. Integrate the **official ONNX Python checker and shape inference** as an optional sandboxed tool with pinned versions; actual ONNX semantic validation cannot be inferred from the minimal parser alone. Ensure large external tensors and symbolic dimensions are handled explicitly and subject to storage quotas. Later add GGUF metadata extraction, TFLite/LiteRT inspection and ExecuTorch `.pte` metadata through official maintained libraries and read-only parsers.

Keep binary parsing and model execution separate: never load unknown model artifacts into an unrestricted runtime simply because static metadata could be extracted.

## 7. Runtime compatibility and operator support

Build a versioned adapter interface:

`RuntimeAdapter { id, version, supportedPlatforms, supportedFormats, availableDelegates, requiredPermissions, inspect(model), validate(model, device), runSmoke(model, inputs, device, policy), benchmark(...), collectEvidence(...) }`

Model your capability check as a *declared* static contract. An ONNX operator name alone does not capture dtype, opset, tensor shapes, dynamic dimensions, quantization, custom kernels, broadcast semantics, compiler constraints or graph partitioning. Official runtime validation must confirm the actual operator set; delegate support and fallback must be recorded separately. Detect unsupported opsets, external data missing, incompatible precision and insufficient runtime memory. Name tested model, backend and runtime versions exactly. Never invent compatibility for unknown accelerators.

## 8. Priority integrations

Implement these *incrementally*, prioritizing official sources and maintained stable releases:

1. **ONNX Runtime**: CPU execution provider first with a small valid open-licensed model, then model-load/run result and actual host latency/peak RSS. Record version and model hash. Optional GPU and edge EPs only where truly available.
2. **LiteRT**: current `CompiledModel` API and actual target-specific quantization workflow; don't assume former TensorFlow Lite Interpreter behavior equals a modern accelerated backend.
3. **ExecuTorch**: PyTorch export/quantization/backends, stable documentation, actual `.pte` target support.
4. **llama.cpp/GGUF**: tokenizer/template/model configuration, context length and KV cache, actual CPU/GPU memory use and token latency; no generic claims based on parameter counts alone.
5. **OpenVINO/CPU-NPU, Core ML, XNNPACK, NNAPI, vendor runtimes**: optional version-pinned adapters, specific hardware proof.

Inventory all skills, plugins and MCP servers present in the Claude environment. Only suggest tools with a clear role and official maintained documentation. Request permission before global install, large model download, paid cloud resources, API connectors, firmware or GPU driver changes. Keep the default product functional without requiring any hosted AI key.

## 9. Quantization and conversion correctness

Create a reproducible recipe format: source model hash, target precision, conversion runtime/version, calibration data reference, representative-distribution rationale, deterministic seed if applicable, target hardware, expected input/output contracts and artifacts. No auto-quantization of unknown user models or use of private calibration data without consent. Avoid sharing calibration examples containing PII. Run conversion in isolated, limited worker(s), not the host CLI directly. Capture converter logs (redacted), failure status and artifact hashes.

Verify baseline/optimized quality on a held-out, representative dataset with the same preprocessing/postprocessing and task metric (accuracy, F1, WER, perplexity, downstream task metrics as appropriate). Record sample count, slice-level regressions, thresholds and uncertainty. Preserve the baseline even if the candidate performs faster. Treat INT4/INT8 as precision labels requiring backend support, not automatic performance upgrades.

## 10. Benchmark execution and statistics

Design a fair and reproducible benchmark harness that records cold start, warm-up count, warm runs, concurrency, batch size, input distribution, clock policy, thermal state, ambient environment when available, battery/power mode, runtime execution provider, backend fallback, sample count, failures, p50/p90/p95/p99 and memory peaks. **Do not benchmark large workloads without resource/time budgets or explicit permission.** Guard against warm-cache bias, thermal throttling, network interference and incompatible input suites.

Add deterministic fixture tests, a clearly labeled host-only toy benchmark, and real-runtime adapters. The existing host toy benchmark demonstrates instrumentation but cannot serve as an edge model baseline. Support comparing imported real-device result JSON only when provenance and workload metadata are sufficient; otherwise return `NOT_COMPARABLE`. Use robust statistics and error bars for larger datasets, and explain when sample counts are too small for meaningful significance.

Keep latency, throughput, quality, memory, energy and cost as distinct metrics. Calculate *estimated* improvements only from explicit formulas; never substitute proxy power values for measured watts. If no energy sensor exists, report `NOT_MEASURED`. A power regression can occur despite a latency improvement.

## 11. EdgeFit and release gates

The compatibility matrix should answer: What exactly was tested? On which device/OS/backend version? With which model/precision? On what data? What are passing and failing operator checks? Was execution physical, emulated, imported or static? Is there enough memory? Did runtime silently fall back to CPU? Is quality within threshold? Does offline mode pass? Is a rollback plan reviewed?

Release gating: `BLOCKED` for observed critical mismatch, unsafe artifact, missing approvals, forbidden data or failed quality threshold. `REVIEW_REQUIRED` for missing actual device evidence or unknown safety controls. `GO_CANDIDATE` only for all configured checks having verified evidence and explicit human signoff. Do not automatically deploy or publish. Generated report must include limitations and what was not tested.

## 12. Cross-IDE and agent skills

Canonical skills live in `skills/edgesutra-*/SKILL.md`, no novel proprietary format required. Supply a host adapter and local copy policy for Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot and optional OpenCode/Antigravity. Confirm installation paths from the host's **current official documentation**, and test actual discovery and invocation for each claimed IDE. Do not consider file copy alone evidence of native agent activation. Claude subagents, Cursor rules, Gemini skill discovery and Copilot custom-agent capabilities are not equivalent; document genuine differences and fallback mode.

Every skill needs YAML frontmatter, clear purpose, trigger, input/output schema, permissions, safety constraints, tools, reproducible steps, sample invocation and verification. Keep them narrow enough for progressive disclosure. The whole product must still run as a CLI on server/CI with **zero additional model credentials** for deterministic checks. When AI is useful, prefer the native selected IDE's authenticated agent or a user-selected local model. Make optional BYOK explicit; no bypass of provider billing or quotas.

## 13. Workflows, rules, MCP and plugin execution

Implement versioned workflows for `EdgeFit`, `QuantizeProof`, `DeviceSmoke`, `OfflineProof`, `DelegateDoctor`, `ReproCapsule`, `ReleaseGate`, and `IncidentDiagnostic`. Workflow steps include a proposed agent, tool permissions, preconditions, cache/retention policy, required evidence and failure behavior. No planner may silently execute arbitrary commands from model files or tool output. Separate plugin catalog inventory from installation. MCP servers must use documented capabilities and explicit human consent for access. Test MCP protocol compatibility rather than assuming a server can access any tool.

Rules: no destructive device changes by default; secrets never stored in reports; no arbitrary model download; sandbox resource controls; privacy-first, least privilege, supported runtime versions, source provenance, no fake hardware results, correct cross-device comparisons and human review. Audit rule violations with stable IDs.

## 14. Security and privacy: red-team checklist

Threat-model malicious ONNX or GGUF files; oversized protobuf records; archive path traversal; untrusted model converters; Python packages that invoke code on import; arbitrary YAML/code execution; prompt-injection in README/model cards; directory symlinks; unsafe output paths; report serving over untrusted networks; leaked calibration data; exposed device identifiers; stolen bearer tokens; SSRF and remote executable commands. All external models and sample data are treated as untrusted inputs. Use explicit allowlists, size and duration limits, no shell interpolation, resource-limited sandbox, and mandatory user approval for network access, hardware changes and installs.

Store secrets in approved environment/secret managers and never in Git. Use hardened CLI and localhost-only server by default. Before a remote server release implement authentication, tenant isolation, authorization scopes, encryption in transit, safe uploads, rate limits, audit logs, signed jobs, retention policies, backup/restore, observability and independent security review. Do not advertise 'zero vulnerabilities' or 'fully secure' guarantees.

## 15. Optional server and dashboard

A future deployment-ready service may use Node.js API handlers and a job queue with separate model/device worker pools. Define `POST /v1/compatibility:check`, `POST /v1/conversion-plans`, `POST /v1/benchmarks`, `GET /v1/jobs/{id}`, `GET /v1/artifacts/{id}`, and event/log streams, but **do not implement unauthenticated remote execution**. Rate-limit expensive operations. Enforce per-tenant quotas, cancellation, execution timeouts and permission gates. Model weights and private benchmarks are never publicly accessible by default.

Build a world-class accessible responsive dashboard when core APIs are trustworthy. Views: model/device inventory, EdgeFit matrix, conversion experimentation, quality-latency-memory tradeoff charts, test-job evidence, GPU fallback alerts, security approvals, and exports. Support keyboard navigation, screen readers, mobile-device-friendly views, reduced motion and sensible empty states. Use native charts and data tables that distinguish unknown/unmeasured values; never render missing values as zero.

## 16. Artifact formats and trust chain

Version schemas for `device-profile.json`, `model-inspection.json`, `compatibility.json`, `conversion-plan.json`, `benchmark-results.json`, `quality-results.json`, `conversion-artifact.json`, `edge-readiness.md`, `provenance.json` and sanitized Repro Capsule bundles. Include content hashes of model weights and input suites, runtime/environment versions, evidence sources, dates, sample sizes and measurements. `sha256` proves artifact integrity when recomputed; it **does not** prove truthfulness, origin or secure provenance. For stronger provenance add signature verification and a trusted runner identity in later phases.

Define deterministic CLI exit codes: successful static analysis with unknowns; policy/compatibility blocked; invalid input; runtime-unavailable; tool error. Version JSON contract before public stable release and write forward/backward compatibility tests.

## 17. Testing and continuous audits

Write unit tests for parser, edge-case varints, memory/operator matching, malformed manifests, precision plans, benchmark equality, quality-latency separation, unknown values and report hashes. Add negative security tests: symlinked file inputs, symlink destinations, invalid path traversal, secret redaction, untrusted shell prompts, oversize inputs, invalid token, unauthorized server writes, unauthorized network access and device permission denial. Use real `node:test` assertions and optional `pytest` for Python adapters.

Keep tests hermetic and free of large downloads. Build GitHub Actions matrix for Linux, Windows, macOS and multiple supported Node versions, but only claim those tested after CI actually runs. Future integration tests use Docker and synthetic device adapters, then gated real-device tests. Test actual USB/ADB or iOS devices only with explicit authorization. Verify clean package extraction and CLI entrypoints. All claimed results must link to test logs.

## 18. Developer experience and open-source excellence

Deliver `README.md` with truthful feature matrix and 2-minute quickstart, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, ADRs, `CHANGELOG.md`, release workflow, issue/PR templates, example model manifests, documented capabilities and responsible benchmark reporting. Keep the install footprint tiny and avoid optional runtime downloads unless requested. English first; design documentation paths for community localization. Include real contributor-friendly small issues and a migration policy for CLI schemas.

Prepare GitHub metadata, npm config (after package-name clearance), semantic release/versioning, signed release artifact plan, SBOM/dependency and secret scanning, and automated documentation tests. **Creator attribution: Vatsal Shah.** Do not invent contributor identity, repository URL, sponsor accounts or licenses for third-party models. Do not claim the user owns an existing package or domain before verifying it.

## 19. Differentiation from existing AI-on-edge tooling

ONNX Runtime, LiteRT, ExecuTorch and llama.cpp already execute models. EdgeSutra's moat is **honest cross-runtime verification, evidence portability and human-understandable device suitability**, not promising a faster model than official engines. Benchmark with clear boundaries, no magical NPU support and reproducibility. Evaluate tools regularly; the field changes quickly. Compare tooling trade-offs and licenses before choosing APIs.

The user should be able to say: "Will this quantized model actually run on this ARM/NPU target, is the quality acceptable, and can I show exactly how I measured it?" EdgeSutra must respond with a precise supported answer or a transparent `UNKNOWN` and the next test to run.

## 20. Phased delivery plan (do not build everything in one unsafe leap)

**Phase P0 — validate and preserve starter:** run tests, inspect real CLI flags, correct docs, improve ONNX metadata tests, security review, produce repeatable demo and honest feature matrix.

**Phase P1 — real ONNX Runtime CPU inference:** use official pinned ONNX tools and a small truly runnable, redistributable model fixture; verify model graph, inputs, outputs, actual CPU inference and host-reported latency. Add a reproducible baseline test suite and compare with a static-only report.

**Phase P2 — conversion and quality:** build an isolated, consent-bound quantization adapter; record model hashes, representative calibration provenance, baseline/candidate outputs and task-quality deltas. Capture actual performance on the same host. Never flash devices.

**Phase P3 — real device connectors:** add one supported Android/Linux edge target and enforce read-only capabilities first; test operator support, delegate mapping, run actual small smoke inference with explicit permission and record hardware/runtime identity. Expand coverage carefully to iOS/embedded.

**Phase P4 — broader runtimes:** LiteRT/ExecuTorch/llama.cpp optional adapters, hardware-specific precision workflows, latency/quality/memory matrices and reproducibility capsules.

**Phase P5 — observability, security and product:** local signed evidence exports, independent audits, dashboard, optional authenticated server, CI gates, device lab, resource budgets and community release.

For EACH phase, write a plan, implementation, automated tests, results, measured limitations, threat assessment and public docs. Do not replace core tests with mocked success. If the environment lacks a device or backend, provide fixture/contract tests and mark actual hardware verification as **not run**, not successful.

## 21. Required first execution and reporting format

1. Read all root and docs source files; `node --version`; list repository tree and optional tools.
2. Execute `npm test`, `npm run doctor`, `npm run demo`, then capture actual stdout, exit codes and generated reports.
3. Compare README, CLI help, tests and sources; fix any inaccurate claims and misleading fixture labels.
4. Inventory installed skills, subagents, MCP servers, plugins and runtime tools. Verify current vendor documentation and user permissions. Prefer project-local installation; ASK before global, paid or device-affecting changes.
5. Implement the **next highest-value missing engineering feature** as working code. Start with real ONNX Runtime CPU smoke inference if runtime dependencies can be installed safely and approved; otherwise improve static parsing and checks with tests.
6. Re-run tests including negative and regression cases. Explicitly label tool not installed, untested OS/IDE and unavailable real devices.
7. Update `docs/STATUS.md`, roadmap and change log to match actual source and results, and produce a precise feature matrix.
8. Summarize implemented files, commands, test evidence, security findings, remaining risks and next milestones.

Do **not** stop with a proposal, abstract architecture, generic skills folder or false 'production-ready' declaration. Build and demonstrate tangible verified improvements, while preserving the root structure.

## 22. Acceptance criteria for a credible public MVP

- Zero additional AI API keys needed for offline core.
- At least one versioned real model/runtime adapter with a genuinely executed smoke test (not synthetic ONNX graph fixture).
- Versioned model and device metadata, actual test-run evidence and explicit missing information.
- Operator/runtime support checks reflect *observed* behavior and static check tier correctly.
- Unsupported ops and unavailable devices fail closed or return `NOT_RUN`.
- Quantization plan is either proposal-only or backed by a real conversion trace; provenance not fabricated.
- Task quality is reported separately from latency/memory and compared on equivalent inputs.
- Portable `SKILL.md` and at least one IDE's native loading verified (others explicitly untested).
- Human permission controls for all device writes/downloads and a safe cancellation path.
- Reproducible tests and examples; clean ZIP/npm package install; public documentation and responsible security disclosure.

## 23. Open source and branding release checklist

Before official publication verify: EdgeSutra name conflicts (exact GitHub/npm/domain and trademarks), package ownership, permissions to distribute model/dataset examples, third-party licenses, security checks, CI on claimed platforms, clear creator credit, contribution process, code of conduct, changelog and public roadmap. No artificial GitHub stars, fabricated adoption stories, benchmark manipulation or spam automation. Be specific and transparent in every release note.

**END OF MASTER SPECIFICATION.** Start engineering from the present repository state. Implement working, auditable code; keep the product truthful, safe, portable and genuinely useful.
