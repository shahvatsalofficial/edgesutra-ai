# Security policy

## Supported versions

| Version | Supported |
|---|---|
| 0.2.x | Yes |
| < 0.2 | No |

## Reporting a vulnerability

Use GitHub **private vulnerability reporting**: <https://github.com/shahvatsalofficial/edgesutra-ai/security/advisories/new>. Do not post exploit details in public issues. Expect an acknowledgement within 7 days; this is a volunteer project and no SLA is promised.

## Scope and honest limits

- EdgeSutra is a local analysis CLI, not a sandbox. The ONNX reader is bounded (32 MiB, field, node and opset caps, strict UTF-8, symlink refusal) and extracts **metadata only**; it never executes a model.
- JSON inputs are size-capped and symlinks are refused. The installer refuses symlinked destinations and never overwrites.
- `serve` binds `127.0.0.1` only, is GET-only, requires a bearer token of at least 16 characters, compares it in constant time and serves only whitelisted report filenames. It is not a hardened multi-user service. Do not expose it to a network.
- SHA-256 integrity detects accidental corruption. It is **not** a signature.
- Never commit tokens. CI scans for common token patterns. Tracked by [docs/THREAT_MODEL.md](docs/THREAT_MODEL.md).

We do not claim the software is free of vulnerabilities.
