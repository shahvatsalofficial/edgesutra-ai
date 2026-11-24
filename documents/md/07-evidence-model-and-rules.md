# Evidence model and rules

## Evidence tiers

@@html:tiers@@

The same tiers in a table:

| Tier | Meaning | Produced today? |
|---|---|---|
| `MEASURED_ON_DEVICE` | Executed on a named target with logs and samples | No |
| `MEASURED_HOST_ONLY` | Timed on the machine running the tool | Yes (toy benchmark) |
| `IMPORTED_MEASUREMENT` | Supplied by someone else with provenance | Planned |
| `STATIC_MATCH` | Declared manifests agree | Yes |
| `MODELED_ESTIMATE` | From explicit assumptions and formulas | No |
| `NOT_RUN` / `UNKNOWN` / `BLOCKED` / `FAILED` / `HUMAN_REVIEW_REQUIRED` | Honest absence or stop states | Yes |

## What it says and never says

@@html:claims@@

## Verdicts

@@html:verdicts@@

@@diagram:decision@@

## Language rules
1. Never write "runs on", "supported on" or "optimized for" a device without `MEASURED_ON_DEVICE`.
2. INT8 / INT4 are precision labels, not speed or power claims.
3. Missing values are `NOT_MEASURED`, never zero.
4. Same file name with different bytes is a different artifact (SHA-256 identity).
5. Latency, throughput, quality, memory, energy and cost are separate metrics.

## Governance rules (in `rules/`)
`compatibility-tier`, `evidence-tier`, `input-trust`, `measurement-truth`, `privacy-offline`, `quality-parity`, `quantization`, `release-control`, `reproducibility`, `scope-and-permissions`, `security`.

## Finding catalogue
| ID | Severity | Trigger |
|---|---|---|
| `ES-COMPAT-MODEL-FORMAT` | blocker | Runtime does not list the model format |
| `ES-COMPAT-OPERATORS` | blocker | Declared operators missing from runtime |
| `ES-COMPAT-PRECISION` | blocker | Runtime lacks model precision |
| `ES-COMPAT-MEMORY-ESTIMATE` | blocker | Declared memory exceeds device availability |
| `ES-COMPAT-ARCHITECTURE` / `ES-COMPAT-OS` | blocker | Target mismatch |
| `ES-UNKNOWN-*` | review | A check could not be decided from declarations |
| `ES-NOT-RUN-DEVICE` | review | Always present: no device execution |
| `ES-NOT-MEASURED-ENERGY` | info | Always present |
| `ES-SYNTHETIC-INPUT` | info | Fixtures or declarations, not observations |
