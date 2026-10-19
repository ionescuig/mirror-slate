# Agent task router

Routing only. How to work: [`.agents/README.md`](../.agents/README.md). Catalog: [`README.md`](README.md). Invariants: [`.cursor/rules/core.mdc`](../.cursor/rules/core.mdc). Names: [`glossary.md`](glossary.md).

**Phase:** The host is Nuxt 4 (D20). Google consent is done. The token is in `secrets/` (D17). The glass is specified in [`product/scope.md`](product/scope.md). A build or a fix follows [`slice`](../.agents/skills/slice/SKILL.md) (D11). Write doc changes with [`asd-ste100`](../.agents/skills/asd-ste100/SKILL.md) (D12).

Read only the row that matches the task. Then open those paths.

| Task | Read in order |
| --- | --- |
| **What the glass shows** | [`product/scope.md`](product/scope.md) |
| **Look, type, color, polish** | [`../PRODUCT.md`](../PRODUCT.md), [`../DESIGN.md`](../DESIGN.md), then [`impeccable`](../.agents/skills/impeccable/SKILL.md) |
| **Why a choice was made** | [`decisions.md`](decisions.md). Grep `^### D` for that id. Do not read the whole file |
| **Where a file goes** | [`guides/repo-layout.md`](guides/repo-layout.md) |
| **Public repository page** | Root [`../README.md`](../README.md). Do not put local setup there (D13) |
| **This machine** | [`guides/local.md`](guides/local.md) |
| **Connect Google** | [`guides/google.md`](guides/google.md), then D18, D17, D4, D8 |
| **Token, secret, LAN, logs** | [`infrastructure/safety.md`](infrastructure/safety.md), then D4, D8, D9, D17 |
| **Weather, refresh** | D5 in [`decisions.md`](decisions.md), then [`product/scope.md`](product/scope.md) |
| **Build, fix, or change behaviour** | [`slice`](../.agents/skills/slice/SKILL.md), then [`quality-gates.md`](infrastructure/quality-gates.md), then [`seams.md`](infrastructure/seams.md) |
| **Write or edit a doc** | [`asd-ste100`](../.agents/skills/asd-ste100/SKILL.md), then [`glossary.md`](glossary.md) |
| **An open product choice** | [`grill-me`](../.agents/skills/grill-me/SKILL.md), then write the answer in the canonical file |
| **Start the host** | [`guides/host.md`](guides/host.md), then [`guides/local.md`](guides/local.md), then D14 in [`decisions.md`](decisions.md) |
| **Scratch** | `WIP/`. Not canonical. Move a stable fact into `docs/` |

No matching row: open the catalog [`README.md`](README.md). Do not scan it first. The public page is the root README (D13).

**Conflict order:** [`README.md`](README.md) § Which file gets a fact.
