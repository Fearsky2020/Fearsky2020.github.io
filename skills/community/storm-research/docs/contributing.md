# Contributing

Contributions to `storm-research` are welcome.

## How the Skill Works

The entire skill is defined in `SKILL.md`. This is a Claude Code skill file — it contains instructions that Claude Code follows when the user invokes `/storm-research`. There is no executable code; the skill is a structured prompt that orchestrates Claude Code's built-in tools.

## What You Can Contribute

### Improve the Methodology

The SKILL.md pipeline can be refined:
- Better perspective discovery strategies
- More effective search query generation
- Improved outline synthesis approaches
- Stronger verification heuristics

### Add Examples

Real-world usage examples help users understand what the skill can do. Add examples to `docs/usage-guide.md`.

### Fix Issues

If you find the skill produces poor results for certain topic types, file an issue describing:
- The exact topic you researched
- What went wrong (missing coverage, bad sources, poor structure)
- What you expected instead

### Documentation

Improvements to docs, architecture descriptions, or README clarity are always welcome.

## Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b improve-verification`)
3. Make your changes
4. Test the skill by running `/storm-research` with several topics
5. Submit a pull request with a clear description of what changed and why

## Testing

Since this is a prompt-based skill (not executable code), testing means running the skill and evaluating output quality:

1. Install the modified skill locally (symlink to `~/.claude/skills/storm-research/`)
2. Run at least 3 different topics across shallow/medium/deep depths
3. Check that:
   - All citations point to real sources
   - The perspective diversity is meaningful
   - The outline is logically organized
   - The verification phase catches at least one nuance
   - The report reads coherently

## Style Guidelines

- Keep SKILL.md instructions precise and unambiguous
- Use imperative mood in pipeline instructions ("Run WebSearch", not "You should run WebSearch")
- Document design decisions in `docs/architecture.md`
- Keep the README focused on getting started; put details in docs/
