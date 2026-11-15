# IDE skills and portability

Canonical skills in `skills/edgesutra-*/SKILL.md`; Claude specialist definitions in `.claude/agents`. Run `node packages/cli/index.mjs install --ide HOST --project /existing/path` for `claude`, `cursor`, `codex`, `gemini`, `copilot`, `opencode` or `antigravity`. File path installation is tested with fixture projects; host discovery/automatic routing has NOT been validated in each real IDE.

| Host | Project-local path | Skill status |
|---|---|---|
| Claude Code | `.claude/skills/` | Portable skill files, native activation untested |
| Cursor | `.cursor/skills/` | Same |
| Codex | `.agents/skills/` | Same |
| Gemini CLI | `.gemini/skills/` | Same |
| GitHub Copilot | `.github/skills/` | Same |
| OpenCode | `.opencode/skills/` | Same |
| Antigravity | `.agent/skills/` | Same |

Actual desktop IDE capabilities and global installation paths may change. Inspect official docs. Portable skill instructions should still work as plain Markdown even when a host does not implement automatic discovery.
