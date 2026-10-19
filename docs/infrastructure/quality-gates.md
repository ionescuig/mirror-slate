# Quality gates

Run these commands before you call a slice done. Report the command and the exit code. Do not claim a pass without a run.

## Commands

From the repo root, with Node 22 on `PATH`. This machine's binary is [`../guides/local.md`](../guides/local.md) (D14).

| Intent | Command |
| --- | --- |
| Test | `node --experimental-strip-types --test ./test/*.test.ts` |
| Lint | `node --experimental-strip-types scripts/lint.ts` |
| Host | `npm run dev` |

There is no type checker in this slice (D14).

Run `read_lints` on every touched file. Fix those diagnostics.

## After a fix

Run the same commands again. A pass after the fix closes the mechanical gate. Do not start a second review to confirm the pass.
