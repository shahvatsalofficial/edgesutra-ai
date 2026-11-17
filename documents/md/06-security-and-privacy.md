# Security and privacy

## Principles
Least privilege, read-only by default, untrusted-input handling, no secrets in artifacts, honest limits.

## Threat table
| Threat | Control | Test |
|---|---|---|
| Malicious / oversized ONNX | 32 MiB cap, field/node/opset caps, bounded varints, no execution | `tests/onnx.test.mjs` (truncated, malformed wire, giant payload, UTF-8) |
| Parser crash on corrupt input | All failures are plain `Error`; mutation fuzz | 500-case test + {{FUZZ}}-case proof run, {{CRASHED}} unexpected crashes |
| Symlink read/write redirection | `lstat` refusal for JSON, ONNX, reports and installer destinations | symlink tests (skip only where the OS forbids symlinks) |
| XSS via model / manifest text in reports | Escape every interpolated value | `HTML escapes external content`, hostile audit test |
| Report tampering | SHA-256 recomputation (`verify`, `render` refuse invalid) | tamper tests |
| Token theft / brute force on `serve` | ≥16-char token, constant-time compare, 127.0.0.1 only | server tests |
| Path traversal on `serve` | Filename allowlist regex, `..` rejection | traversal test |
| Overwriting user files on install | No-overwrite policy | overwrite test |
| Supply-chain | Zero dependencies; CI secret scan; npm provenance on release | CI |
| Prompt injection from model cards | Skills treat all model metadata as untrusted; no execution of model-provided commands | skill text, `rules/input-trust.md` |

## Privacy
No telemetry or network calls. Hostname is reduced to a 10-hex-char SHA-256 prefix. No serials, usernames, or environment variables are collected. Files written with `0600` on POSIX.

## Known limits (not hidden)
- SHA-256 is not authenticity; signing is on the roadmap.
- The ONNX reader is metadata-only and does not validate graph semantics.
- `serve` is for local use. Do not expose it.
- Windows ACLs are not set by the `0600` mode.
- No independent third-party penetration test has been performed.

## Reporting
GitHub private vulnerability reporting on the repository.
