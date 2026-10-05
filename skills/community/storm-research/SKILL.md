---
name: storm-research
description: "STORM-inspired deep research — discovers perspectives, runs multi-agent web research, builds an outline, writes a cited long-form report. Invoke with /storm-research <topic>."
trigger: /storm-research
---

# /storm-research

Generate comprehensive, Wikipedia-quality research reports on any topic using the STORM methodology: perspective-guided question asking, multi-source web research, outline generation, grounded writing with citations, and adversarial fact-checking.

Inspired by [Stanford OVAL's STORM](https://github.com/stanford-oval/storm).

## Usage

```
/storm-research <topic>
/storm-research <topic> --depth shallow       # 3 perspectives, ~2k word report
/storm-research <topic> --depth medium        # 5 perspectives, ~4k word report (default)
/storm-research <topic> --depth deep          # 8 perspectives, ~8k word report
/storm-research <topic> --format markdown     # output as markdown (default)
/storm-research <topic> --format artifact     # render as an HTML artifact
/storm-research <topic> --outline-only        # stop after outline generation
/storm-research <topic> --no-verify           # skip adversarial fact-checking phase
```

## What It Does

Turns a topic into a fully cited research report through five phases:

1. **Perspective Discovery** — identifies diverse expert viewpoints relevant to the topic
2. **Multi-Perspective Research** — parallel web searches from each perspective, gathering sources
3. **Outline Generation** — synthesizes findings into a hierarchical article structure
4. **Grounded Writing** — writes each section with inline citations from collected sources
5. **Verification & Polish** — adversarial fact-checking, gap detection, and final refinement

## Pipeline

When invoked, follow this pipeline exactly. Each phase builds on the previous one.

### Phase 0: Parse Input

Extract from the user's message:
- `TOPIC`: the research subject (required)
- `DEPTH`: shallow | medium | deep (default: medium)
- `FORMAT`: markdown | artifact (default: markdown)
- `OUTLINE_ONLY`: boolean (default: false)
- `NO_VERIFY`: boolean (default: false)

Set perspective counts based on depth:
- shallow: 3 perspectives, target ~2,000 words
- medium: 5 perspectives, target ~4,000 words
- deep: 8 perspectives, target ~8,000 words

### Phase 1: Perspective Discovery

**Goal**: Identify N diverse expert viewpoints that would research this topic differently.

1. Run 2-3 web searches to understand the topic landscape:
   - `WebSearch` for `"<TOPIC> overview"` 
   - `WebSearch` for `"<TOPIC> perspectives debate controversy"`
   - `WebSearch` for `"<TOPIC> expert analysis research"`

2. From the search results, identify N perspectives. Each perspective is:
   - A **role** (e.g., "Economic Policy Researcher", "Environmental Scientist", "Industry Practitioner")
   - A **focus** (what aspect they'd investigate)
   - **3-5 initial questions** they'd want answered

   Perspectives must be diverse: aim for technical, social, historical, practical, and critical viewpoints. Avoid redundant angles.

3. Output a numbered list of perspectives to the user:
   ```
   Researching "<TOPIC>" from N perspectives:
   1. [Role] — [Focus] 
   2. [Role] — [Focus]
   ...
   ```

### Phase 2: Multi-Perspective Research

**Goal**: Gather broad, grounded information from each perspective via web search.

For each perspective, run a research agent (use the `Agent` tool for parallelism when possible):

Each research agent must:
1. Take the perspective's role, focus, and initial questions
2. For each question, run `WebSearch` with a well-crafted query
3. For the top 2-3 results per question, use `WebFetch` to extract key facts, data, and quotes
4. Track all sources with URLs and titles
5. Return a structured research brief:
   ```
   Perspective: [Role]
   Key Findings:
   - [Finding 1] [Source: title, url]
   - [Finding 2] [Source: title, url]
   ...
   Follow-up Questions Discovered:
   - [Question that emerged from research]
   ```

After all perspectives complete, run **one follow-up round**:
- Collect the most important follow-up questions across perspectives (up to 5)
- Run additional `WebSearch` + `WebFetch` for each
- Add findings to the research corpus

### Phase 3: Outline Generation

**Goal**: Synthesize all research into a hierarchical article outline.

1. Review ALL collected findings across perspectives
2. Generate a hierarchical outline with:
   - **Title** for the report
   - **Sections** (H2 level) — each covering a major theme or aspect
   - **Subsections** (H3 level) — specific topics within each section
   - For each section/subsection, note which findings and sources support it
3. The outline should follow a logical flow:
   - Introduction / Background / Context
   - Core technical or substantive sections
   - Different perspectives or debates
   - Current state / Recent developments
   - Implications / Future directions
   - Conclusion

4. Present the outline to the user. If `OUTLINE_ONLY` is true, stop here.

### Phase 4: Grounded Article Writing

**Goal**: Write each section grounded in collected sources with inline citations.

For each major section, write content that:
1. Synthesizes information from multiple sources
2. Uses inline citations in the format `[N]` where N maps to the reference list
3. Presents multiple viewpoints where relevant
4. Includes specific data, statistics, and quotes from sources
5. Maintains encyclopedic, neutral tone
6. Flows naturally between subsections

Build a **References** section at the end with all cited sources:
```
## References

[1] Title. URL
[2] Title. URL
...
```

Use agents in parallel to write sections concurrently when there are 4+ sections. Each writing agent receives:
- The section outline with assigned findings
- The full source list for citation numbering consistency
- Instructions on tone and citation format

After all sections are written, assemble them with:
- A lead paragraph summarizing the topic (before the first section)
- Smooth transitions between sections
- Consistent citation numbering throughout

### Phase 5: Verification & Polish

**Goal**: Adversarial fact-checking and quality refinement.

Skip this phase if `NO_VERIFY` is true.

1. **Claim Verification**: Identify the 5-10 most important factual claims in the article. For each:
   - Run a `WebSearch` to verify the claim independently
   - Mark as CONFIRMED, MODIFIED (with correction), or UNVERIFIABLE
   - Fix any claims that need correction

2. **Gap Detection**: Review the article for:
   - Important aspects of the topic not covered
   - Perspectives missing from the analysis
   - Claims without adequate sourcing
   - Add brief notes on any significant gaps

3. **Polish**:
   - Ensure consistent formatting
   - Fix any citation numbering issues
   - Add a brief "Limitations" note if significant gaps were found
   - Generate a one-paragraph abstract/summary at the top

### Phase 6: Output

Based on `FORMAT`:

**markdown** (default): Output the complete report as markdown text in the conversation.

**artifact**: Use the `Artifact` tool to render an HTML page with:
- Clean typography (system font stack, 1.4 line height)
- Table of contents with anchor links
- Styled citation references
- Responsive layout
- Print-friendly styles

In both cases, end with a brief research summary:
```
---
Research Summary:
- Perspectives explored: N
- Sources consulted: M
- Claims verified: K/L confirmed
- Total word count: ~W
```

## Quality Standards

- Every factual claim must have at least one citation
- No fabricated sources — all URLs must come from actual WebSearch/WebFetch results
- Present opposing viewpoints fairly when they exist
- Acknowledge uncertainty and limitations
- Use specific data and examples over vague generalizations
- Maintain encyclopedic neutrality — avoid advocacy language

## Error Handling

- If `WebSearch` returns no results for a query, try rephrasing. If still empty, note the gap and continue.
- If `WebFetch` fails on a URL, skip that source and note it. Don't fabricate content.
- If fewer than 3 total sources are found, warn the user that the report may be limited.
- If the topic is too narrow for the requested depth, downgrade depth and inform the user.

## Example

```
User: /storm-research The impact of large language models on scientific research

Output:
Researching "The impact of large language models on scientific research" from 5 perspectives:
1. AI Researcher — How LLMs are being used as research tools
2. Scientific Publisher — Impact on peer review and publication
3. Research Ethics Specialist — Concerns about AI-generated content in science
4. Domain Scientist (Biology) — Practical applications in specific fields
5. Science Policy Analyst — Funding and institutional implications

[... full research pipeline runs ...]

# The Impact of Large Language Models on Scientific Research

**Abstract**: Large language models have rapidly transformed scientific research...

## 1. Background and Emergence
...

## References
[1] ...
```
