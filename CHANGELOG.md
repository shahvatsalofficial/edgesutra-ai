# Changelog

## 0.2.0 — 2026-11-16

First public release.

### Added
- `edgesutra audit --out DIR`: one command writes JSON + Markdown + HTML audit reports, all supporting artifacts and `SHA256SUMS.txt`. Verdict is `BLOCKED` or `REVIEW_REQUIRED`; `GO_CANDIDATE` is never produced without on-device evidence.
- Report engine rewritten: shared block model so Markdown and HTML carry identical content; responsive, dark-mode-aware, escaped HTML; tables, severity pills, evidence-tier and not-tested sections.
- `--version`, documented exit codes (0 ok, 1 blocked/incompatible, 2 error), `edgesutra-ai` bin alias.
- Cross-platform test runner (`scripts/run-tests.mjs`); `tests/audit.test.mjs`.
- Legal, trust and proof documentation (`docs/LEGAL_AND_TRUST.md`, `docs/proof/`), `llms.txt`, `CITATION.cff`, `NOTICE`.
- CI: Linux/Windows/macOS matrix, tarball clean-install smoke test, audit artifact upload, secret scan; tag-driven release workflow with npm provenance.

### Fixed
- Test suite failed on Windows: four symlink tests threw `EPERM` when symlinks are not permitted. They now skip explicitly (never silently pass) and run wherever symlinks are allowed (Linux/macOS CI).
- `npm test` shell glob was not expanded by `cmd.exe` on Node 20 (Windows CI).
- Benchmark `host.id` embedded the raw hostname; it is now a short SHA-256 prefix so shared reports do not leak machine names.
- `check` now exits `1` for `INCOMPATIBLE` so CI can gate on it.

### Changed
- Package renamed `edgesutra-ai`, no longer `private`; `files` allowlist for a small tarball.

## 0.1.0 — 2026-11-11

Initial offline-first starter. Not published.
