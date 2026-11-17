# Technical reference

## CLI
```
edgesutra doctor|profile|version
edgesutra inspect   --input model.onnx [--out file]
edgesutra check     --model f --device f --runtime f [--out file]
edgesutra plan      --model f --device f --runtime f [--precision int8|float16] [--out file]
edgesutra benchmark [--runs 2..100] [--iterations 1..10000] [--inputs 2..100] [--out file]
edgesutra compare   --baseline f --candidate f
edgesutra verify    --input report.json
edgesutra render    --input report.json --format md|html --out file
edgesutra audit     --out dir [--model f --device f --runtime f | --onnx model.onnx] [--runs n --iterations n --inputs n]
edgesutra install   --ide claude|cursor|codex|gemini|copilot|opencode|antigravity --project dir
edgesutra serve     --reports dir [--port 8847]   # env EDGESUTRA_BEARER_TOKEN (≥16 chars)
```

## Exit codes
| Code | Meaning |
|---|---|
| 0 | Success (including `REVIEW_REQUIRED`) |
| 1 | Blocked / incompatible |
| 2 | Invalid input, unsafe path, integrity failure or tool error |

## Manifests (schemaVersion 1)
- **Model:** `id`, `format`, `operators[]`, optional `precision`, `requiredMemoryMB`.
- **Device:** `id`, `architecture`, `availableMemoryMB`, optional `os`, `installedRuntimes[]`.
- **Runtime:** `id`, `formats[]`, `operators[]`, `precisions[]`, optional `architectures[]`, `os[]`.

## Check names
`model-format`, `operators`, `precision`, `memory-estimate`, `architecture`, `os`, `runtime-present`, `real-device-execution` (always `unknown`).

## Status values
`STATICALLY_COMPATIBLE`, `REQUIRES_VERIFICATION`, `INCOMPATIBLE`; audit verdicts `BLOCKED`, `REVIEW_REQUIRED`.

## Finding IDs
`ES-COMPAT-<CHECK>` (blocker), `ES-UNKNOWN-<CHECK>` (review), `ES-NOT-RUN-DEVICE`, `ES-NOT-MEASURED-ENERGY`, `ES-SYNTHETIC-INPUT`.

## Integrity
`integrity = SHA-256(canonical JSON with sorted keys, excluding the integrity field)`. Detects corruption; not a signature.

## ONNX reader limits
32 MiB file; 200 000 protobuf fields per message; 10 000 nodes; 100 opsets; strings ≤ 1024 bytes; varint ≤ 10 bytes; strict UTF-8; wire types 0/1/2/5 only; duplicate graph rejected.

## Server
`GET /health` (public) · `GET /report?file=NAME.(json|md|html)` with `Authorization: Bearer …`. Security headers: `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, CSP `default-src 'none'`.
