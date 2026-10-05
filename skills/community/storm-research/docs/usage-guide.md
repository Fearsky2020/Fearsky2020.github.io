# Usage Guide

## Quick Start

After installing the skill, type `/storm-research` followed by your topic in any Claude Code session:

```
/storm-research the economic impact of remote work
```

The skill will run through all phases automatically and output a cited report.

## Command Reference

```
/storm-research <topic> [options]
```

### Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--depth` | `shallow`, `medium`, `deep` | `medium` | Controls research breadth and report length |
| `--format` | `markdown`, `artifact` | `markdown` | Output format |
| `--outline-only` | (flag) | off | Stop after outline generation |
| `--no-verify` | (flag) | off | Skip the fact-checking phase |

### Depth Levels

**Shallow** (`--depth shallow`)
- 3 expert perspectives
- ~15-20 web searches
- ~2,000 word report
- Best for: quick overviews, familiar topics, time-sensitive needs

**Medium** (`--depth medium`) — default
- 5 expert perspectives
- ~30-40 web searches
- ~4,000 word report
- Best for: most research needs, balanced depth and speed

**Deep** (`--depth deep`)
- 8 expert perspectives
- ~60-80 web searches
- ~8,000 word report
- Best for: comprehensive analysis, unfamiliar topics, academic-quality reports

## Examples

### Basic Research

```
/storm-research quantum computing applications in drug discovery
```

Produces a ~4,000 word report with perspectives from quantum physicists, pharmaceutical researchers, computational chemists, etc.

### Quick Overview

```
/storm-research the history of containerization in shipping --depth shallow
```

A concise ~2,000 word overview with 3 perspectives.

### Deep Dive with HTML Output

```
/storm-research the global semiconductor supply chain --depth deep --format artifact
```

An ~8,000 word comprehensive report rendered as a navigable HTML page with table of contents.

### Outline Planning

```
/storm-research artificial general intelligence --outline-only
```

Returns just the perspective list and structured outline — useful for reviewing scope before committing to a full report.

### Fast Mode (Skip Verification)

```
/storm-research renewable energy storage technologies --no-verify
```

Skips the adversarial fact-checking phase for faster output.

## Understanding the Output

### Report Structure

A typical report includes:

1. **Abstract** — One-paragraph summary of the topic
2. **Numbered Sections** — Major themes organized hierarchically
3. **Inline Citations** — `[1]`, `[2]`, etc. linking to sources
4. **References** — Full list of cited sources with URLs
5. **Research Summary** — Statistics on perspectives, sources, and verification

### Citation Format

Citations appear inline:

> Large language models have been shown to achieve human-level performance on medical licensing exams [3], though their reliability in clinical settings remains debated [7][12].

Each number maps to the References section:

> [3] Performance of ChatGPT on USMLE. https://example.com/...
> [7] Limitations of AI in Clinical Decision Making. https://example.com/...

### Research Summary

Every report ends with:

```
Research Summary:
- Perspectives explored: 5
- Sources consulted: 34
- Claims verified: 7/8 confirmed
- Total word count: ~4,200
```

## Tips

### Getting Better Results

1. **Be specific** — "The impact of microplastics on marine food chains" produces better results than "pollution"
2. **Include context** — "CRISPR applications in agriculture (post-2020)" helps focus the research
3. **Use deep for complex topics** — Topics with many dimensions benefit from more perspectives

### When to Use Which Depth

| Scenario | Recommended Depth |
|----------|------------------|
| Blog post research | shallow |
| Technical overview for a meeting | medium |
| Literature review for a paper | deep |
| Quick fact-finding | shallow |
| Understanding a new domain | deep |
| Current events summary | shallow or medium |

### Combining with Other Tools

The output is standard markdown, so you can:
- Pipe it into other Claude Code skills
- Save to a file with follow-up instructions
- Use the outline as a starting point for your own writing
- Feed the research into other workflows

## Limitations

- Research quality depends on what's available via web search
- Very recent events (last 24-48 hours) may not appear in search results
- Highly technical or niche topics may have limited web sources
- Reports are syntheses, not original research — they reflect what's published online
- WebSearch availability and rate limits affect research breadth
