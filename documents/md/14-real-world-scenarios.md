# Real-world scenarios

Seven situations edge-AI teams actually hit, with the **real output** of EdgeSutra AI v{{VERSION}}. Every terminal block is produced by running the CLI when this site is built, not typed by hand.

> **Reading the output.** `fail` means a declared fact disagrees. `unknown` means nothing was declared or nothing ran. Neither means "it works".

## 1. A pull request swaps in a runtime that lacks an operator

**Who:** an embedded engineer on a Raspberry Pi product. **Situation:** a teammate switches the runtime manifest to a smaller build to save flash. The model still uses `Relu`, and the new runtime does not list it.

@@diagram:ci@@

@@term:s1@@

The command exits with code **1**, so the CI job fails before merge. The failure names the exact operator, so nobody has to guess.

> **Why it matters:** a missing operator is found in seconds instead of on the first device in the field. The check reads declared manifests only, so it can reject a combination but cannot approve one.

## 2. The model does not fit in memory

**Who:** a product manager choosing hardware. **Situation:** the candidate model needs about 2 GB. The target board has 256 MB available.

@@term:s2@@

The memory check compares the model's **declared** requirement with the device's **declared** available memory. If the model had no declared requirement, the result would be `unknown`, never `pass`.

## 3. Inspect a real ONNX file safely

**Who:** an ML engineer handed a model from a vendor. **Situation:** the file is untrusted. You want its operators and a fingerprint without running anything.

@@term:s3@@

The reader is bounded (32 MiB, field and node limits, strict UTF-8, symlinks refused) and never executes the model. The result is `REQUIRES_VERIFICATION`, not "compatible": the operators match, but a runtime on a device must still confirm them.

@@diagram:evidence@@

## 4. Someone claims "INT8 is faster"

**Who:** a team lead reviewing a quantization proposal. **Situation:** the slide says INT8 will be 4x faster. You want a measurement, not a label.

@@term:s4@@

@@bench@@

On this host the simulated INT8 path is **not** automatically faster: it is ordinary JavaScript arithmetic. That is the point. A precision label is not a speed-up, and a laptop number is not a device number. The report says `targetDevice: NOT_TESTED` and keeps energy and peak memory as `NOT_MEASURED`.

## 5. The full audit for a release review

**Who:** a tech lead preparing a go/no-go meeting. **Situation:** the reviewers want one folder they can open without installing anything.

@@term:s5@@

@@html:verdicts@@

The folder contains `audit-report.html` and `audit-report.md` (same content), `audit-report.json`, every supporting artifact and `SHA256SUMS.txt`. The findings in that report:

@@findings@@

@@diagram:decision@@

## 6. A report is edited after the fact

**Who:** an auditor. **Situation:** a report was forwarded by email. Someone changed the verdict to `GO_CANDIDATE`.

@@term:s6@@

Every artifact carries a SHA-256 over its canonical JSON. The edit is caught and `verify` exits with code **2**. `render` also refuses to draw a report whose seal is invalid.

> **Limit:** the seal detects change. It is not a signature, so someone who rewrites both the report and its hash is not stopped. Signing is on the roadmap.

## 7. An AI IDE joins the review

**Who:** a developer using Claude Code, Cursor, Codex, Copilot or Gemini CLI. **Situation:** they want the same review roles inside their editor.

@@term:s7@@

Twenty role skills (Prime, Device Atlas, Runtime Bridge, Operator Sentinel, Quality Witness, Release Auditor and more) are copied into the project. The installer never overwrites and refuses symlinked destinations.

> **Honest note:** copying files is not proof the IDE loads them. Native discovery is documented as not independently verified.

## Which scenario is yours?

| You want to… | Command | Scenario |
|---|---|---|
| Stop a bad runtime change in CI | `check` | 1 |
| Rule out a board before buying it | `check` | 2 |
| Look inside an untrusted model | `inspect` | 3 |
| Test a speed claim | `benchmark` | 4 |
| Hand reviewers one report | `audit` | 5 |
| Prove a report was not changed | `verify` | 6 |
| Use the review roles in your IDE | `install` | 7 |
