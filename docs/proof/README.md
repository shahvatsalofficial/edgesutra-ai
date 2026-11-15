# Proof of the recorded run

Regenerate: `npm run proof`. These files are machine output, not hand-written.

| Field | Value |
|---|---|
| Tool | edgesutra-ai 0.2.0 |
| Node / platform | v24.15.0 · win32/x64 |
| Recorded | 2026-11-15T19:09:20.268Z |
| Tests | 86 |
| Passed | 82 |
| Failed | 0 |
| Skipped | 4 (symlink tests skip on hosts that forbid symlinks; they execute on Linux/macOS CI) |
| Parser fuzz | 2000 mutated inputs, 0 unexpected crashes |

Files: `test-run.tap`, `environment.json`, `fuzz-results.json`, `cli-*.txt`, `SHA256SUMS.txt`.

**Limits:** one machine, one run. It shows the software behaves as documented on that host; it does not show target-device performance. CI results on other OSes are in the GitHub Actions history.
