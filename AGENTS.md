# EdgeSutra AI — instructions for all supported coding agents

You are contributing to EdgeSutra AI (creator Vatsal Shah). First read `README.md`, `docs/STATUS.md`, `docs/ARCHITECTURE.md`, `docs/THREAT_MODEL.md`, and `docs/CLAUDE_MASTER_BUILD_PROMPT.md` before major changes. 20 canonical skills live in `skills/` and optional Claude roles in `.claude/agents/`.

1. No arbitrary ONNX execution, unsupported hardware assumptions, automatic model downloads, private dataset uploads, firmware flashes, remote device writes or production deployments.
2. Source evidence and measured values outrank model assertions. Treat unknowns as unknown and keep host-vs-target records separate.
3. Run `npm test` and `npm run demo` before and after changes; add tests for every new adapter, negative cases, and security boundaries.
4. Keep portable skills neutral. IDE-specific wrapper discovery must be verified for each named host.
5. Request explicit human approval for software installations, paid services, invasive profiling, remote connections or hardware changes.
6. Maintain clean license attribution and truthful status. Do not mark future adapters implemented.
