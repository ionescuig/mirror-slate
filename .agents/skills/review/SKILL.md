---
name: review
description: >-
  Capped spec and standards review for a mirror-slate slice. Use this skill at
  the end of the slice skill, before you call the work done, or when the human
  asks for a review.
---

# Review

Do one pass. Keep the two axes separate.

**Spec.** Say whether the slice did the three lines from [`slice`](../slice/SKILL.md). Name the missing line.

**Standards.** Check the diff against [`seams.md`](../../../docs/infrastructure/seams.md), [`safety.md`](../../../docs/infrastructure/safety.md), and [`DESIGN.md`](../../../DESIGN.md).

Tag each finding `critical`, `high`, `medium`, or `low`.

| Tag | Action |
| --- | --- |
| critical or high | Fix the finding before you call the slice done. A safety break is always this tag |
| medium | Fix the finding, or name the finding and leave the finding |
| low | Write the finding. Do not block the slice |

A critical or high behaviour finding needs a test. A code tweak is not enough.

Write at most 400 words for each axis. Do not write a scorecard.

Skip this skill for a trivial slice.
