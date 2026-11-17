# EdgeSutra AI

**Measure on devices. Prove every trade-off.**
An evidence-first edge-AI compatibility, quantization-planning and benchmark-auditing toolkit — a keyless offline CLI plus 20 portable agent skills for Claude Code, Cursor, Codex, GitHub Copilot, Gemini CLI, OpenCode and Antigravity. Created by [Vatsal Shah](https://github.com/shahvatsalofficial).

[![CI](https://github.com/shahvatsalofficial/edgesutra-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/shahvatsalofficial/edgesutra-ai/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/edgesutra-ai)](https://www.npmjs.com/package/edgesutra-ai)
[![Docs](https://img.shields.io/badge/docs-github.io-0b6a7a)](https://shahvatsalofficial.github.io/edgesutra-ai/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
![Node](https://img.shields.io/badge/node-%3E%3D22-green)
![Dependencies](https://img.shields.io/badge/runtime%20dependencies-0-brightgreen)

> **Honest scope.** EdgeSutra is **not** an inference framework and does **not** run models on edge hardware today. It tells you what is *measured*, what is only *declared*, and what is *unknown* — and refuses to blur them. See [What is and is not proven](#what-is-and-is-not-proven).

## Why

Exporting or quantizing a model is easy. Proving it runs well on a *specific* device is not, and "it's INT8 so it's faster" is a common, unproven claim. EdgeSutra separates four things that are often conflated:

1. **Model metadata** — operators, opsets and SHA-256 read from ONNX bytes (no execution).
2. **Static compatibility** — declared model / runtime / device manifests agree or disagree.
3. **Host-only measurement** — a real timed run on *this* machine's CPU (never labelled as device evidence).
4. **On-device evidence** — not yet implemented; reported as `NOT_RUN`, never faked.

The output is a reviewable **audit report** (Markdown + HTML + JSON) with a default-deny verdict: `BLOCKED` or `REVIEW_REQUIRED`. `GO_CANDIDATE` is never emitted without verified on-device evidence and human sign-off.

## Quick start (2 minutes, Node.js 22+, no API key, no network)

```bash
npx edgesutra-ai audit --out ./edge-audit
```

Writes `audit-report.html`, `audit-report.md`, `audit-report.json`, every supporting artifact and `SHA256SUMS.txt`. Open the HTML file in a browser. Bring your own inputs:

```bash
npx edgesutra-ai audit --out ./edge-audit --model model.json --device device.json --runtime runtime.json
npx edgesutra-ai audit --out ./edge-audit --onnx path/to/model.onnx
```

Exit codes: `0` ok · `1` blocked/incompatible · `2` invalid input or tool error (CI-friendly).

### Other commands

| Command | What it does | Evidence tier |
|---|---|---|
| `audit` | Full report bundle: JSON + MD + HTML + checksums + verdict | mixed, labelled per artifact |
| `inspect --input m.onnx` | Bounded protobuf metadata reader (≤ 32 MiB) | metadata only |
| `check` | Static model/device/runtime contract check | `STATIC_MATCH` |
| `plan` | Non-executing conversion plan with manifest fingerprints | `NOT_RUN` |
| `benchmark` / `compare` | Toy FP32 vs simulated INT8 on this host; comparability guard | `MEASURED_HOST_ONLY` |
| `profile` | Host OS/CPU/RAM (GPU, NPU, storage explicitly *not probed*) | host only |
| `verify` / `render` | Recompute SHA-256 integrity; render MD/HTML | integrity |
| `install --ide …` | Copy 20 skills into a project (never overwrites) | n/a |
| `serve` | Read-only, bearer-token, 127.0.0.1-only report server | n/a |

## What is and is not proven

| Claim | Status |
|---|---|
| Parses ONNX operators/opsets, rejects truncated, oversized, malformed and symlinked input | **Tested** (see [proof](docs/proof/README.md)) |
| Static compatibility, plan, benchmark, report, server, installer behave as documented | **Tested** — full suite green on the recorded run (counts in [proof](docs/proof/README.md)) |
| Reports never present host-only timing as device latency; energy/carbon/peak memory are `NOT_MEASURED` | **Tested** |
| Inference on ONNX Runtime / LiteRT / ExecuTorch / llama.cpp | **Not implemented** (roadmap P1+) |
| Any physical or virtual edge device execution | **Not implemented** → `NOT_RUN` |
| Native skill discovery in each IDE | **Not independently verified** — files are copied to documented paths only |
| SHA-256 report integrity | Detects corruption. It is **not** a signature and proves nothing about origin |

Full detail: [docs/STATUS.md](docs/STATUS.md) · [Evidence model](docs/EVIDENCE_MODEL.md) · [Audit reports](docs/AUDIT_REPORTS.md).

## Documentation

Full documentation site (executive, functional, architecture, technical, user guide, security, evidence, test report, legal, roadmap): **<https://shahvatsalofficial.github.io/edgesutra-ai/>**

## Trust, proof and legal

- **Recorded test run, TAP log and environment:** [`docs/proof/`](docs/proof/README.md); a sample audit is committed at [`examples/reports/audit/`](examples/reports/audit/audit-report.md).
- **Zero runtime dependencies**, no telemetry, no network calls, no credentials read. Reports contain a hashed host id, not your hostname.
- **License:** Apache-2.0 (code, skills, docs). Test fixtures are synthetic and carry no third-party model weights. See [Legal & trust](docs/LEGAL_AND_TRUST.md), [NOTICE](NOTICE), [THIRD_PARTY_NOTICES](THIRD_PARTY_NOTICES.md).
- **No endorsement or affiliation** with Microsoft/ONNX, Google/LiteRT, Meta/ExecuTorch, ggml/llama.cpp, Apple, Arm, Qualcomm or any IDE vendor; those names are trademarks of their owners and appear only to describe compatibility targets.
- **Security:** [SECURITY.md](SECURITY.md) · [threat model](docs/THREAT_MODEL.md) · private reporting via GitHub Security Advisories.

## Portable agent skills

20 role skills (Prime, Device Atlas, Silicon Scout, Runtime Bridge, Model Cartographer, Operator Sentinel, Graph Surgeon, Quantization Alchemist, Calibration Steward, Quality Witness, Latency Lab, Memory Guardian, Energy Boundary, Thermal Observer, Offline Guardian, Artifact Provenance, Deployment Gate, IDE Bridge, Security Sentinel, Release Auditor) live in [`skills/`](skills). Install into a project:

```bash
npx edgesutra-ai install --ide claude --project /path/to/project
```

Targets: `claude` `.claude/skills` · `cursor` `.cursor/skills` · `codex` `.agents/skills` · `gemini` `.gemini/skills` · `copilot` `.github/skills` · `opencode` `.opencode/skills` · `antigravity` `.agent/skills`. Skills are instructions for a host agent; they are not autonomous services.

## Architecture

`packages/core` pure engine · `packages/cli` commands · `packages/reporting` MD/HTML renderers · `packages/server` localhost read-only view · `skills/` canonical roles · `rules/ policies/ workflows/ schemas/` governance contracts · `docs/` architecture, evidence, security. Deep dive: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Roadmap

P1 real ONNX Runtime CPU smoke inference → P2 isolated quantization with quality deltas → P3 one read-only Android/Linux device connector → P4 LiteRT/ExecuTorch/llama.cpp adapters → P5 signed evidence and dashboard. See [ROADMAP.md](ROADMAP.md).

## Develop

```bash
git clone https://github.com/shahvatsalofficial/edgesutra-ai && cd edgesutra-ai
npm test && npm run demo && npm run audit
```

## Citation

See [CITATION.cff](CITATION.cff). Creator: Vatsal Shah. Package and repository names are `edgesutra-ai`; trademark clearance for "EdgeSutra" has not been performed.

**Keywords:** edge AI, on-device AI, ONNX, quantization, INT8, TinyML, model compatibility, benchmark audit, Claude Code skills, Cursor, Codex, Copilot, Gemini CLI, Agent Skills, SKILL.md, MCP.
