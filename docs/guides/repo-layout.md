# Repo layout

Cursor opens `mirror-slate/` only. Git is not initialized (D2).

| Path | Holds |
| --- | --- |
| `README.md` | Public repository page (D13). Not the agent router |
| `AGENTS.md` | Root pointer. Open [`docs/AGENTS.md`](../AGENTS.md) from here |
| `PRODUCT.md` | Who the glass is for |
| `DESIGN.md` | Visual tokens. The impeccable skill reads this file |
| `docs/glossary.md` | The only names. Follow this file |
| `docs/product/` | What the glass shows |
| `docs/infrastructure/` | Safety, commands, and review checks |
| `docs/decisions.md` | Why. Grep `^### D` |
| `docs/guides/` | `host.md` runs the Pi. `google.md` connects Google. `local.md` is this machine. `repo-layout.md` says where a file goes |
| `.agents/skills/` | `slice` is the default path. `slice` calls `grill-me`, `tdd`, `review`, and `asd-ste100`. `impeccable` is the look |
| `.cursor/rules/` | Short invariants. A rule points at a doc. A rule does not copy the doc |
| `WIP/` | Scratch. Not canonical |
| `secrets/` | Secret and token. Create this folder when you connect Google. Do not paste values into docs |
| `brand/` | Public homepage and privacy policy for Google Publish (D18). The host does not serve this folder |
| `data/` | Optional rendered cache. Git ignores `data/` |

## App code

The host is one Nuxt 4 process (D20). Keep `docs/` at the root. Do not nest a second git repo.

| Path | Holds |
| --- | --- |
| `app/pages/` | The glass page |
| `app/components/` | Clock, weather, tasks, calendar, fullscreen, and empty lines |
| `app/composables/` | Clock, fullscreen, and the glass payload |
| `app/assets/css/` | Ground, type scale, and the system font |
| `nuxt.config.ts` | Host, modules, and the listen address |
| `tsconfig.json` | Nuxt project references. Do not copy compiler options into this file |
| `server/` | `/api/glass`, `/oauth`, and `/oauth/callback` |
| `server/utils/` | Token load and OAuth. This code stays off the glass |
| `shared/utils/` | Clock, tasks, calendar, weather, and the payload fields |
| `test/` | Public behaviour. `node --test` loads this folder. `test/tsconfig.json` extends the Nuxt node config and adds Node types |
| `scripts/lint.ts` | Runs `node --check` on each TypeScript file |
| `.tools/` | Optional local Node binary. Git ignores `.tools/` |
