# Agents — start here

Policy lives in `docs/`. This file routes. This file does not copy the glass, the decisions, or the layout.

**Router:** [`docs/AGENTS.md`](../docs/AGENTS.md). Read one row.

## Baseline

- The host is one Nuxt 4 process (D20). Commands are in [`docs/infrastructure/quality-gates.md`](../docs/infrastructure/quality-gates.md).
- A feature or a fix follows [`slice`](skills/slice/SKILL.md) through the gate. Do not wait for the human to ask for tests, lint, review, a browser check, or a doc update (D11, D12).
- The human does not read the docs. The human does not choose the file. The router does.
- Skip `WIP/` unless the human pointed at a file there.
- Do not start git unless the human asks (D2).

## Skills

| Skill | When |
| --- | --- |
| [`slice`](skills/slice/SKILL.md) | Any feature, fix, or vibe-coded change. Asks only when a product choice is open. Then tests, lint, review, browser check, and the doc update |
| [`asd-ste100`](skills/asd-ste100/SKILL.md) | Write or edit a doc, a decision, a rule, or a project skill. Also when a slice changes a fact |
| [`tdd`](skills/tdd/SKILL.md) | One behaviour, one test, then the code. The slice skill calls this skill |
| [`review`](skills/review/SKILL.md) | End of a slice. Spec and standards. The slice skill calls this skill |
| [`grill-me`](skills/grill-me/SKILL.md) | One question when the docs do not answer. The slice skill calls this skill |
| [`impeccable`](skills/impeccable/SKILL.md) | Design, critique, or polish the glass. Read `PRODUCT.md` and `DESIGN.md` first |
| [`writing-for-agents`](skills/writing-for-agents/SKILL.md) | Edit a skill or `AGENTS.md` when the task is the document shape, not the sentence rules |

A new skill is a repeated workflow. A one-line invariant goes in `.cursor/rules/` and points at the doc.

## Policy

| Topic | Canonical doc |
| --- | --- |
| Names | [`docs/glossary.md`](../docs/glossary.md) |
| Glass | [`docs/product/scope.md`](../docs/product/scope.md) |
| Look | [`PRODUCT.md`](../PRODUCT.md) · [`DESIGN.md`](../DESIGN.md) |
| Safety | [`docs/infrastructure/safety.md`](../docs/infrastructure/safety.md) |
| Decisions | [`docs/decisions.md`](../docs/decisions.md) |
| Layout | [`docs/guides/repo-layout.md`](../docs/guides/repo-layout.md) |
| Checks | [`docs/infrastructure/quality-gates.md`](../docs/infrastructure/quality-gates.md) · [`docs/infrastructure/seams.md`](../docs/infrastructure/seams.md) |
| Router | [`docs/AGENTS.md`](../docs/AGENTS.md) |
