#!/usr/bin/env sh
set -eu
node packages/cli/index.mjs install --ide "${1:?claude|cursor|codex|gemini|copilot}" --project "${2:?existing project directory}"
