# Architecture

## Overview

`storm-research` is a Claude Code skill that implements a multi-phase research pipeline inspired by Stanford OVAL's [STORM](https://github.com/stanford-oval/storm) system. It uses Claude Code's native tools (WebSearch, WebFetch, Agent) to produce cited research reports.

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Input                               │
│                  /storm-research <topic>                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1: Perspective Discovery                                 │
│                                                                 │
│  WebSearch × 3 → Identify N expert viewpoints                   │
│  Output: List of (role, focus, initial questions)               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 2: Multi-Perspective Research                            │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Agent 1  │ │ Agent 2  │ │ Agent 3  │ │ Agent N  │          │
│  │Perspective│ │Perspective│ │Perspective│ │Perspective│          │
│  │ Research │ │ Research │ │ Research │ │ Research │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│       │             │             │             │               │
│       └─────────────┴──────┬──────┴─────────────┘               │
│                            │                                    │
│                    Follow-up Round                               │
│              (top 5 cross-perspective questions)                 │
│                                                                 │
│  Output: Research briefs with findings + source URLs            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 3: Outline Generation                                    │
│                                                                 │
│  All findings → Hierarchical outline                            │
│  Sections organized by theme, not by perspective                │
│  Each section annotated with supporting sources                 │
│                                                                 │
│  Output: Structured outline with source mapping                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 4: Grounded Article Writing                              │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │ Section  │ │ Section  │ │ Section  │  (parallel for 4+)     │
│  │ Writer 1 │ │ Writer 2 │ │ Writer N │                       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘                       │
│       └─────────────┴──────┬─────┘                              │
│                            │                                    │
│                    Assembly + Transitions                        │
│                                                                 │
│  Output: Full article with [N] inline citations                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 5: Verification & Polish                                 │
│                                                                 │
│  1. Claim Verification (WebSearch for top 5-10 claims)          │
│  2. Gap Detection (missing perspectives, unsourced claims)      │
│  3. Polish (formatting, citation numbering, abstract)           │
│                                                                 │
│  Output: Final verified report                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 6: Output                                                │
│                                                                 │
│  markdown → conversation text                                   │
│  artifact → HTML page via Artifact tool                         │
└─────────────────────────────────────────────────────────────────┘
```

## Design Decisions

### Why Perspectives Instead of Direct Search?

Direct search on a topic tends to return the same top results repeatedly. By first identifying distinct expert viewpoints, each perspective generates different search queries, producing broader coverage. This mirrors STORM's key insight that "different perspectives lead to different questions."

### Why Parallel Agents?

Claude Code's `Agent` tool allows spawning independent research threads. Each perspective's research is independent, making it ideal for parallel execution. This reduces wall-clock time significantly for medium and deep research depths.

### Why Separate Outline from Writing?

Separating outline generation from content writing allows:
1. The outline to synthesize across ALL perspectives before any writing begins
2. Users to review and redirect the structure (with `--outline-only`)
3. Parallel writing of sections, since each writer knows the full structure

### Why Adversarial Verification?

LLM-generated content can contain plausible-sounding but incorrect claims. The verification phase independently re-searches key claims to catch errors. This is an improvement over the original STORM system, which doesn't include explicit fact-checking.

### Citation Strategy

All citations use a simple `[N]` format mapping to a numbered reference list. Sources are only included if they come from actual `WebSearch`/`WebFetch` results — never fabricated. This keeps the output honest and verifiable.

## Tool Dependencies

| Tool | Used In | Purpose |
|------|---------|---------|
| `WebSearch` | Phases 1, 2, 5 | Discover sources and verify claims |
| `WebFetch` | Phase 2 | Extract detailed content from discovered URLs |
| `Agent` | Phases 2, 4 | Parallel perspective research and section writing |
| `Artifact` | Phase 6 | HTML output rendering (optional) |

## Depth Scaling

| Setting | Perspectives | Word Target | Research Queries | Verification Claims |
|---------|-------------|-------------|-----------------|-------------------|
| shallow | 3 | ~2,000 | ~15-20 | 3-5 |
| medium | 5 | ~4,000 | ~30-40 | 5-8 |
| deep | 8 | ~8,000 | ~60-80 | 8-10 |

## Relationship to Stanford STORM

This skill adapts STORM's methodology for Claude Code's environment:

- **STORM** uses a Python pipeline with external search APIs and conversation simulation between a "Wikipedia writer" and "topic expert" personas.
- **storm-research** uses Claude Code's native tools (WebSearch, WebFetch, Agent) with a streamlined pipeline that replaces conversation simulation with structured perspective-based research briefs.

The core insight is preserved: multi-perspective research produces better coverage than single-pass approaches.
