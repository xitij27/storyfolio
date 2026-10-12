# Pre-freeze capability difference

The first read-only dry check completed successfully. Root's subsequent
strict deep-equality comparison with the baseline capabilities failed
before preparation. The full new capabilities remain in
`pre-freeze-dry/stdout.log`; the exact differences are in
`capability-drift-tool.json`. No model, preparation or browser had launched.

Only `disabledSkills` and its corresponding `skills.config` argument differ:
the current discovery additionally disables both path forms of the unrelated
installed `meeting-notes-and-actions` skill. Model, reasoning effort, CLI
identity, native Node, permission/network settings, every other argument
and all four frozen environment values are identical. The reason for that
skill's filesystem availability changing is not established here.

Root disposition, before candidate freeze: retain the new explicit disable.
Do not remove another user skill or enable it merely to recover byte-equal
configuration. This preserves the intended isolation from unrelated skills.
Proceed as a fixture/prompt/model/environment-matched comparison with this
disclosed configuration difference, not an entirely byte-identical control.
The old capabilities and result remain unchanged. Audit actual actor skill
reads, and require the new frozen capabilities to match at setup, readiness
and paid launch. No comparator or source guard is weakened.
