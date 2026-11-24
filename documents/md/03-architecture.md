# Architecture

## Context
```
 user / CI / AI-IDE ──► edgesutra CLI ──► core engine ──► sealed JSON artifacts ──► MD / HTML renderer
                                   │                                      └────► SHA256SUMS.txt
                                   └──► (optional) localhost read-only report server
```

## Layers

@@html:layers@@

The same layers, in detail:

| Layer | Path | Responsibility | Depends on |
|---|---|---|---|
| CLI | `packages/cli/index.mjs` | Strict argument parsing, exit codes, file I/O | core, reporting, server |
| Core | `packages/core/*.mjs` | Pure functions: `inspectOnnx`, `checkCompatibility`, `makePlan`, `benchmarkToy`, `runAudit`, `installSkills` | Node built-ins |
| Reporting | `packages/reporting/report.mjs` | One block model → Markdown and HTML | core/util |
| Server | `packages/server/index.mjs` | 127.0.0.1, GET-only, bearer auth, filename allowlist | core/util |
| Skills | `skills/*/SKILL.md`, `agents/`, `.claude/agents/` | Role instructions for host agents | none (data) |
| Governance | `rules/`, `policies/`, `workflows/`, `schemas/` | Contracts the roles and reports follow | none (data) |

## Key decisions (ADR summaries)
1. **No runtime dependencies.** Keeps supply-chain exposure and install size minimal. *Trade-off:* hand-written protobuf reader instead of `onnx`. *Mitigation:* bounded, fuzzed, labelled metadata-only.
2. **Evidence tiers in every artifact.** Prevents host benchmarks being read as device results.
3. **Default-deny verdict.** The tool can reject, never approve. Humans approve.
4. **One block model for MD and HTML.** Prevents the two formats drifting apart.
5. **Static manifests are declarations.** They are labelled `STATIC_MATCH`, never "compatible with device".
6. **Adapters later.** Real runtimes (ONNX Runtime, LiteRT, ExecuTorch, llama.cpp) arrive as optional, version-pinned, sandboxed adapters.

## How an artifact is sealed

@@diagram:evidence@@

## Data contracts
All artifacts carry `schemaVersion: 1`, `kind`, and `integrity` (SHA-256 over the canonical JSON of the rest). JSON schemas live in `schemas/`.

## Failure behavior
Invalid input → exit 2 with one-line message; incompatible → exit 1; unknown values stay `unknown`/`NOT_MEASURED` and are never coerced to zero.
