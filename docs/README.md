# Documentation

The agent record lives in this `docs/` tree. The host is one Nuxt 4 process (D20). The human does not read these files (D12).

**For agents:** read one row of [AGENTS.md](AGENTS.md). How to work is [`.agents/README.md`](../.agents/README.md). This page is the catalog. Do not open this page to choose a task.

## Which file gets a fact

Write the fact in one file before you call the slice done.

| Kind of fact | File |
| --- | --- |
| What the glass shows | [`product/scope.md`](product/scope.md) |
| How the glass looks | [`../DESIGN.md`](../DESIGN.md) and [`../PRODUCT.md`](../PRODUCT.md) |
| Who can see the data, and where the token lives | [`infrastructure/safety.md`](infrastructure/safety.md) |
| Why | [`decisions.md`](decisions.md). Use the next `D#` |
| A name | [`glossary.md`](glossary.md) |
| Where a file goes | [`guides/repo-layout.md`](guides/repo-layout.md) |
| How to run the host | [`guides/host.md`](guides/host.md) |
| This machine | [`guides/local.md`](guides/local.md) |
| The public repository page | root [`../README.md`](../README.md). Do not write agent instructions there |

**Conflict order:** `product/scope.md` for regions. `DESIGN.md` for pixels. `decisions.md` for why. `infrastructure/safety.md` for the token and the LAN. `WIP/` loses.

## Catalog

| Doc | Purpose |
| --- | --- |
| [glossary.md](glossary.md) | Approved names |
| [product/scope.md](product/scope.md) | The glass, the displays, what is not built |
| [infrastructure/safety.md](infrastructure/safety.md) | Token, LAN, logs |
| [infrastructure/quality-gates.md](infrastructure/quality-gates.md) | Test and lint commands (D14) |
| [infrastructure/seams.md](infrastructure/seams.md) | End-of-slice checks |
| [decisions.md](decisions.md) | Decision index. Grep `^### D` |
| [guides/repo-layout.md](guides/repo-layout.md) | Where a file goes |
| [guides/host.md](guides/host.md) | Run the host on the Pi |
| [guides/local.md](guides/local.md) | This machine. Not the public README |
| [guides/google.md](guides/google.md) | How to connect Google. Publish removes the 7-day limit (D18) |
| [AGENTS.md](AGENTS.md) | One row per task |
| [../PRODUCT.md](../PRODUCT.md) | Who the glass is for |
| [../DESIGN.md](../DESIGN.md) | Tokens |
