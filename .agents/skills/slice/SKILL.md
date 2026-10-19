---
name: slice
description: >-
  Default path for a mirror-slate feature, fix, or vibe-coded change. Ask one
  question when the docs do not answer a product choice. Then add tests, lint,
  a review, a browser check, and the canonical doc update. Use this skill even
  when the human does not mention tests, lint, review, QA, or docs.
---

# Slice

Follow this skill for each feature or each fix. The human does not ask for tests, lint, review, or a doc update. Do those steps before you say the slice is done.

## When you ask

Read the canonical docs before you ask. Ask with [`grill-me`](../grill-me/SKILL.md) only when a choice is open and the choice changes the glass, Google access, or the host network. Ask one question. Give a recommended answer.

Do not ask about a file name. Do not ask about the test tool after the stack decision names the tool.

The stack is Nuxt 4 (D20). Do not ask for a stack. The process serves the glass and keeps the token. Commands are in [`quality-gates.md`](../../../docs/infrastructure/quality-gates.md).

## Size

| Size | You do |
| --- | --- |
| Trivial | Change the words. Lint the file. Stop |
| Behaviour | Write the three lines below. Follow [`tdd`](../tdd/SKILL.md). Run the gate |
| Open choice | Ask. Update the canonical doc with [`asd-ste100`](../asd-ste100/SKILL.md). Then follow the behaviour path |

Do not write a plan file unless the human asks for a plan. The tests are the spec.

## Three lines

Write these lines before the code:

1. What the glass does.
2. What the glass must not do.
3. What this slice does not include.

## Gate

1. Run the commands in [`quality-gates.md`](../../../docs/infrastructure/quality-gates.md). Report each command and the exit code. Run `read_lints` on each touched file.
2. Check the diff against [`seams.md`](../../../docs/infrastructure/seams.md).
3. Follow [`review`](../review/SKILL.md). Fix a critical finding. Fix a high finding. Fix a medium finding, or name the finding and leave the finding.
4. If the glass changed, follow [`browser-qa.mdc`](../../../.cursor/rules/browser-qa.mdc).
5. If the slice changes behaviour, safety, look, layout, or commands, update the one canonical file. Follow [`asd-ste100`](../asd-ste100/SKILL.md). Then run `python3 .agents/skills/asd-ste100/scripts/ste-lint.py` on that file. Chat is not the record.
6. Run the mechanical commands again after a fix. Do not run a second review.

Do not start git (D2).
