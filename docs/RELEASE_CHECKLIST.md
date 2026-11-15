# Release audit checklist

- [ ] Verify global brand, domain, package and trademark availability.
- [ ] Run CI on supported operating systems and exact Node versions.
- [ ] Verify all CLI artifacts with negative and tamper tests.
- [ ] Run actual hardware benchmark only on authorized test devices and state device IDs.
- [ ] Distinguish metadata-only checks from official runtime execution.
- [ ] Prove accuracy parity with real labeled/held-out datasets, not just toy examples.
- [ ] Threat model, supply-chain scan, redaction, licensing and provenance review.
- [ ] Add official ONNX Runtime adapter before advertising ONNX inference or conversion.
- [ ] Confirm server authentication and hardening before external hosting.
- [ ] Validate every claimed IDE skill discovery and actual role activation.
- [ ] Obtain release sign-off from human maintainer.
