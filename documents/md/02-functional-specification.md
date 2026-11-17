# Functional specification

## Personas
| Persona | Need | Feature |
|---|---|---|
| Embedded / IoT engineer | Know early if a model can possibly fit a target | `check`, `plan`, `audit` |
| Mobile ML developer | Compare FP32 vs INT8 honestly | `benchmark`, `compare` |
| Tech lead / reviewer | A one-page decision record | `audit` HTML/MD |
| CI maintainer | Fail the build on incompatibility | exit code `1` |
| AI-IDE user | Reusable review roles | `install --ide …` |

## Functional requirements
| ID | Requirement | Status |
|---|---|---|
| F-01 | Read ONNX protobuf metadata (operators, opsets, node count, SHA-256) without execution; reject >32 MiB, malformed, truncated, symlinked | Implemented, tested |
| F-02 | Validate model/device/runtime manifests and report per-check `pass`/`fail`/`unknown` | Implemented, tested |
| F-03 | Produce a non-executing conversion plan with manifest fingerprints | Implemented, tested |
| F-04 | Run a deterministic toy FP32 vs simulated INT8 benchmark on the host with p50/p95, CPU time and post-run RSS | Implemented, tested |
| F-05 | Refuse to compare benchmarks with different workloads/hosts (`NOT_COMPARABLE`) | Implemented, tested |
| F-06 | Seal every artifact with SHA-256 integrity; `verify` recomputes it | Implemented, tested |
| F-07 | Render reports as Markdown and HTML with identical content; HTML must escape all external text | Implemented, tested |
| F-08 | `audit` writes JSON+MD+HTML, artifacts and `SHA256SUMS.txt`; verdict `BLOCKED` or `REVIEW_REQUIRED` only | Implemented, tested |
| F-09 | Install 20 skills into 7 IDE conventions without overwrite or symlink traversal | Implemented, tested |
| F-10 | Serve reports read-only on 127.0.0.1 with bearer auth | Implemented, tested |
| F-11 | Run real ONNX Runtime inference | **Not implemented** |
| F-12 | Run on a physical device / measure energy | **Not implemented** |

## Verdict logic
1. Any failed static check → `BLOCKED` (exit 1).
2. Otherwise → `REVIEW_REQUIRED` (exit 0): device execution is always `NOT_RUN` today.
3. `GO_CANDIDATE` requires verified on-device evidence **and** human sign-off. Unreachable in this release by design.

## Non-functional requirements
Node ≥ 22; no dependencies; deterministic outputs for identical inputs (except timestamps and timings); reports < 1 MB; all file inputs size-capped.
