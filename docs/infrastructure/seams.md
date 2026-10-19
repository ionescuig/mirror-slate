# Seams

Check the diff against this list at the end of a slice. A miss is a review finding.

| Seam | Expectation |
| --- | --- |
| Token | The token and the secret stay in `secrets/`. They are absent from HTML, client scripts, and logs |
| Scopes | `calendar.readonly` and `tasks` (D21). The host may write a task status. The host does not write the calendar |
| Network | The host binds to the LAN. There is no port forward, tunnel, or public host |
| Regions | Clock, weather, tasks, and calendar, as in [`product/scope.md`](../product/scope.md). A new region needs a decision |
| Empty | No events shows `Nothing scheduled.` An empty list is a quiet empty state. Do not invent a row |
| Weather | Today, then five days. A failed fetch does not invent a number |
| Type | Use the tokens in [`DESIGN.md`](../../DESIGN.md). A task title or an event title stays at least 1rem |
| Tests | Test public behaviour. A safety rule or a payload rule that changed has a test |
| Cache | A rendered cache, if any, is under `data/`. Git ignores `data/` |
| Docs | The canonical file matches the code. The text follows [`glossary.md`](../glossary.md) |
