# Threat model

Assets: model file hashes, sensitive model IP, calibration datasets, user prompts, device identities, SSH/ADB credentials, benchmark artifacts and release metadata. Adversaries: malicious model files, poisoned calibration data, compromised model converters, supply-chain dependencies, prompt injection in repository content, forged benchmark reports, unauthorized remote device API calls and exposed report servers.

Existing protections: maximum ONNX inspection size and bounded field decoding; no dynamic model execution; no arbitrary subprocess; project-local skill installation with overwrite and symlink guards; JSON size/symlink checks; localhost read-only authenticated server with traversal defenses; detached verification of JSON-integrity hash (corruption only); no cloud-key dependency.

Known gaps: ONNX metadata parser is not a complete memory-safe parser, not an isolated process; report hash is not keyed/signed; service has no audit storage or distributed authentication; concurrent multi-user operations and sensor privilege enforcement absent. Do not expose reports server to the public Internet. Real runtime adapter MUST include a trusted sandbox and model file safety checks.
