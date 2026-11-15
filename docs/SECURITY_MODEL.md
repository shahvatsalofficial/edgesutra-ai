# EdgeSutra threat model

Threats: untrusted model files, malicious repository instructions, oversized protobuf fields, fake benchmark samples, device fingerprint leaks, firmware loss, destructive on-device scripts, malicious packages, stolen server tokens and SSRF through future connectors.

Controls: bounded static parser with no arbitrary shell execution; explicit unknown status; user-approved paths; immutable evidence hashes; offline-first; loopback-only server; bearer tokens; avoid credential serialization; no remote endpoints or flashing in core. Future live model runtimes require isolated non-root containers or hardware workers; device authorization, signed model manifests, trusted toolchains, audit logs, kill switches, and rollback evidence.
