# storm-research

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill that generates comprehensive, Wikipedia-quality research reports using the [STORM](https://github.com/stanford-oval/storm) methodology from Stanford OVAL.

## What It Does

`/storm-research` turns any topic into a fully cited research report through five phases:

```
Topic → Perspectives → Multi-Source Research → Outline → Grounded Writing → Fact-Checked Report
```

| Phase | What Happens |
|-------|-------------|
| **Perspective Discovery** | Identifies 3-8 diverse expert viewpoints on the topic |
| **Multi-Perspective Research** | Parallel web searches from each perspective, gathering sources |
| **Outline Generation** | Synthesizes findings into a hierarchical article structure |
| **Grounded Writing** | Writes each section with inline `[N]` citations from real sources |
| **Verification & Polish** | Adversarial fact-checking, gap detection, and refinement |

## Installation

### Option A: Symlink (recommended for development)

```bash
# Clone the repo
git clone https://github.com/aruneshvv/claude-research-skill.git

# Symlink into your Claude Code skills directory
ln -s "$(pwd)/claude-research-skill" ~/.claude/skills/storm-research
```

### Option B: Copy

```bash
# Copy the skill file directly
mkdir -p ~/.claude/skills/storm-research
cp SKILL.md ~/.claude/skills/storm-research/SKILL.md
```

### Option C: Install as a Claude Code skill from URL

```bash
# Using Claude Code's skill installation (if supported)
claude skill install https://github.com/aruneshvv/claude-research-skill
```

After installation, restart Claude Code. The `/storm-research` command will be available.

## Usage

```bash
# Basic research (5 perspectives, ~4k words)
/storm-research The impact of quantum computing on cryptography

# Quick overview (3 perspectives, ~2k words)
/storm-research renewable energy storage --depth shallow

# Deep dive (8 perspectives, ~8k words)
/storm-research the history and future of CRISPR gene editing --depth deep

# Get just the outline
/storm-research artificial general intelligence --outline-only

# Render as an interactive HTML artifact
/storm-research supply chain resilience --format artifact

# Skip fact-checking (faster, less thorough)
/storm-research transformer architectures --no-verify
```

## How It Works

The skill implements the core STORM methodology adapted for Claude Code's tool ecosystem:

### 1. Perspective-Guided Question Asking

Instead of a single research pass, the skill discovers N diverse expert perspectives on the topic. Each perspective generates different questions, ensuring broad coverage:

```
Topic: "Nuclear Fusion Energy"
├── Nuclear Physicist      → "What are the current plasma confinement approaches?"
├── Energy Economist       → "What are the cost projections vs. renewables?"  
├── Policy Analyst         → "What regulatory frameworks exist?"
├── Environmental Scientist → "What is the environmental footprint?"
└── Industry Engineer      → "What engineering challenges remain?"
```

### 2. Parallel Multi-Source Research

Each perspective runs its own research thread using `WebSearch` and `WebFetch`, gathering real sources with URLs. Research agents run in parallel for speed.

### 3. Synthesized Outline

All findings are merged into a single hierarchical outline that organizes information by theme, not by perspective — producing a coherent article structure.

### 4. Citation-Grounded Writing

Every section is written with inline `[N]` citations pointing to the actual sources discovered during research. No fabricated references.

### 5. Adversarial Verification

Key claims are independently re-searched to verify accuracy. Claims are marked as CONFIRMED, MODIFIED, or UNVERIFIABLE.

## Output Quality

- Every factual claim has at least one real citation
- All source URLs come from actual web searches (no fabrication)
- Opposing viewpoints are presented fairly
- Uncertainty and limitations are acknowledged
- Encyclopedic, neutral tone throughout

## Comparison with STORM

| Feature | Stanford STORM | storm-research |
|---------|---------------|----------------|
| Research method | Simulated Wikipedia writer ↔ expert conversations | Multi-perspective parallel web research |
| Search | Uses external search APIs (You.com, Bing, etc.) | Uses Claude Code's WebSearch + WebFetch |
| Execution | Python package, requires API keys | Claude Code skill, zero setup |
| Outline | Generated from conversation transcripts | Synthesized from structured research briefs |
| Citations | Grounded in retrieved documents | Inline `[N]` with URL references |
| Verification | Limited | Adversarial fact-checking phase |
| Parallelism | Sequential pipeline | Multi-agent parallel research |

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI, desktop app, or web)
- WebSearch and WebFetch tools available in your Claude Code session

## Project Structure

```
claude-research-skill/
├── SKILL.md              # The skill definition (this is what Claude Code reads)
├── README.md             # This file
├── LICENSE               # MIT License
└── docs/
    ├── architecture.md   # Technical architecture and design decisions
    ├── usage-guide.md    # Detailed usage guide with examples
    └── contributing.md   # Contribution guidelines
```

## Contributing

See [docs/contributing.md](docs/contributing.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).

## Credits

- Inspired by [STORM](https://github.com/stanford-oval/storm) from [Stanford OVAL](https://oval.cs.stanford.edu/)
- Paper: [Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models](https://arxiv.org/abs/2402.14207) (Shao et al., NAACL 2024)
- Built for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by [Anthropic](https://anthropic.com)
