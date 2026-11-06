Storyfolio 0.1.1 adds a README inside the plugin folder, for Anthropic's plugin directory. It says what the skill runs, writes and fetches. The skill's instructions and the engine are unchanged from 0.1.0.

## Update

```bash
claude plugin marketplace update storyfolio
claude plugin update storyfolio@storyfolio
```

A folder copy updates by copying `skills/storyfolio/` again. Sites already made are not affected.

## Changes from 0.1.0

- `skills/storyfolio/README.md`: new.
- `skills/storyfolio/.claude-plugin/plugin.json`: version 0.1.1.
- `README.md`: the project status shows the 0.1.0 release.

Every file under `skills/storyfolio/engine/` is byte-identical to 0.1.0, so 0.1.0's clean-install proof holds.

## Files

- `storyfolio-0.1.1.tar`: the marketplace file, README, LICENSE and `skills/storyfolio/`, made by `git archive` from this tag. sha256 `9938fd6efd3349ceac778aff09345c98cf8cf78efa802b2e9ef1c47a35771410`.
- `storyfolio-0.1.1-files.sha256`: the sha256 of each of its 137 files.

The `plugin` branch holds the same files and nothing else, for the directory to track.
