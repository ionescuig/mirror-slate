---
name: asd-ste100
description: "Use when English text must be parsed without a human to resolve ambiguity — tool descriptions, error messages, inter-agent instructions, system prompts, status reports — and misreading has a real cost, or when text reads as dense, hedged, or easy to misparse. In mirror-slate, also use when you write or edit a doc, a decision, a rule, or a project skill, and when a slice changes a fact. Triggers: disambiguate, STE100 rewrite, apply Simplified Technical English, plain-language rewrite, controlled-language rewrite, rewrite so an agent cannot misread this. Not for creative or marketing copy. Not for the imported impeccable tree."
version: 0.4.0
---

# Simplified Technical English (ASD-STE100)

## This repository

The human does not read the docs. The docs are the agent record (D12). Default mode is **Strict** for `docs/`, `.cursor/rules/`, and project skills other than `impeccable` and `writing-for-agents`. Do not rewrite those two imported trees. Do not rewrite the root `README.md` into glossary English. That file is the public page (D13).

Names are in [`docs/glossary.md`](../../../docs/glossary.md). Use that file for one word, one meaning. The official dictionary is not in this repo.

When a slice changes a fact, update one canonical file. The map is in [`docs/AGENTS.md`](../../../docs/AGENTS.md) and below.

| The slice changes | Write |
| --- | --- |
| What the glass shows | `docs/product/scope.md` |
| Why | the next `D#` in `docs/decisions.md` |
| Pixels or type | `DESIGN.md` |
| Who the glass is for | `PRODUCT.md` |
| Token, secret, or LAN | `docs/infrastructure/safety.md` |
| A test or lint command | `docs/infrastructure/quality-gates.md` |
| A review check | `docs/infrastructure/seams.md` |
| Where a file goes | `docs/guides/repo-layout.md` |
| A new name | `docs/glossary.md` |

Write the file. Do not leave the fact only in chat. After a doc edit, run:

`python3 .agents/skills/asd-ste100/scripts/ste-lint.py <file>`

Fix a hard violation. Keep a hedge when the hedge is the fact.

Do not "fix" these linter hits. They are false for this repo:

- `display` and `show`. `display` is the noun in the glossary. `show` is the verb.
- A `long-sentence` hit that starts in `DESIGN.md` YAML frontmatter.
- `passive-voice` is advisory. Change it only when the actor is missing.

A new task needs one new row in `docs/AGENTS.md`. Do not add a second router.

Read [`references/rewrite.md`](references/rewrite.md) when a sentence stays ambiguous after the linter.

