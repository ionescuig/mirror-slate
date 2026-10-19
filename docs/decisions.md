# Decisions

Open the index only. Read one decision with `grep '^### D'`. Do not read the whole file.

[`product/scope.md`](product/scope.md) says what the glass does. This file says why. When the two files disagree, follow `product/scope.md` for behaviour.

Add a decision: put the next id in the index, then add a `### D…` section. Write the section with [`asd-ste100`](../.agents/skills/asd-ste100/SKILL.md).

## Index

| ID | Topic |
| --- | --- |
| D1 | The glass is our page, not an existing product |
| D2 | No git until the human asks |
| D3 | The host serves the glass. A display has no login |
| D4 | One Google client, read-only, durable token |
| D5 | Clock on the display. Weather from Open-Meteo. Poll the rest |
| D6 | Layout and the list control |
| D7 | Black glass for the tablet and a desktop |
| D8 | The token and the secret stay in `secrets/` |
| D9 | The token stays on the host. The host stays on the LAN |
| D10 | Look lives in PRODUCT.md and DESIGN.md |
| D11 | A slice runs tests, lint, review, and browser checks |
| D12 | Docs are the agent record. Write them in ASD-STE100 |
| D13 | The root README is the public page |
| D14 | One Nuxt 4 process serves the glass |
| D15 | The ground is `#000` |
| D16 | The place is in `.env`. Secrets stay in `secrets/` |
| D17 | A Testing token lasts 7 days |
| D18 | Publish removes the 7-day limit. The host stays on the LAN |
| D19 | The host listens on every LAN interface |
| D20 | The host is Nuxt 4 with Nuxt UI |
| D21 | The glass may mark a task done or open |

---

### D1 — The glass is our page, not an existing product

The glass is a page in this repository. Magic Mirror does not include Google Tasks as a core module. DAKboard locks the free layout. Home Screens does not show Google Tasks. Do not install those products. Follow [`product/scope.md`](product/scope.md).

### D2 — No git until the human asks

Do not run `git init`. Do not commit. Do not add a remote. `.gitignore` is ready for the first commit.

### D3 — The host serves the glass. A display has no login

The host serves the glass on the home LAN. A display opens that address. The display does not show a login. The human completes Google consent once on another machine. The host keeps the token (D4).

### D4 — One Google client, read-only, durable token

Use one Google Cloud project for Calendar and Tasks. Use the scopes `calendar.readonly` and `tasks`. D21 replaces the Tasks scope. The Tasks scope fills the list control and marks a task done or open.

Publish removes the 7-day Testing limit (D18). Do not send the app for Google verification. The human is the only person. Continue past the unverified-app warning.

Keep the secret and the token in `secrets/` (D8). Download the secret when Google shows the secret. The console hides the secret after that screen.

A secret iCal URL can read the calendar. Treat that URL as a password. Prefer the one OAuth client.

### D5 — Clock on the display. Weather from Open-Meteo. Poll the rest

The display draws the clock. Weather comes from [Open-Meteo](https://open-meteo.com/en/docs). Open-Meteo needs no key for personal use. Poll weather every 15 to 30 minutes. Poll tasks and the calendar every few minutes. Do not add a Google push channel.

### D6 — Layout and the list control

Put the clock at the top center. Put weather after the clock, toward the top right. Show today larger than the next five days. The list control shows every list. The human picks one list. The first layout put tasks on the left. The current columns are in [`product/scope.md`](product/scope.md). The calendar is the left column. Tasks are the right column.

### D7 — Black glass for the tablet and a desktop

Use a black ground and light type. The type must stay readable through mirror film on a dim panel. Tokens are in [`DESIGN.md`](../DESIGN.md). Do not use pure black or pure white.

The tablet is a Galaxy Tab A7 Lite, SM-T220. The panel is 8.7 inch and 1340×800. Landscape shows two columns. Portrait stacks the clock and the weather, then the two columns. A desktop display uses the same glass.

### D8 — The token and the secret stay in `secrets/`

Put the OAuth client JSON, the token, and `.env` files in `secrets/` or match `.gitignore`. Docs name the files. Docs do not contain the values. Do not invent a secret or a token.

### D9 — The token stays on the host. The host stays on the LAN

The display receives rendered fields only. Do not send the token or the secret to the display. Bind the host to the home LAN. A display has no login, so a person on that LAN can read the glass. Accept that risk on the home LAN. Refuse that risk on a guest network or a public network. Do not add a port forward, a tunnel, or a new Google scope without a new decision.

Detail: [`infrastructure/safety.md`](infrastructure/safety.md).

### D10 — Look lives in PRODUCT.md and DESIGN.md

[`PRODUCT.md`](../PRODUCT.md) says who the glass is for. [`DESIGN.md`](../DESIGN.md) holds the tokens. Regions stay in [`product/scope.md`](product/scope.md). Read those files before you change the look. Use the `impeccable` skill. Do not copy the palette into a rule.

### D11 — A slice runs tests, lint, review, and browser checks

Follow [`slice`](../.agents/skills/slice/SKILL.md) for a feature or a fix. Do not wait for the human to ask for tests, lint, review, or a browser check.

Ask one question only when the docs do not answer a choice that changes the glass, Google access, or the host network. Give a recommended answer. Write the answer in the canonical file.

Commands: [`quality-gates.md`](infrastructure/quality-gates.md). Checks: [`seams.md`](infrastructure/seams.md). Git stays off until the human asks (D2).

### D12 — Docs are the agent record. Write them in ASD-STE100

The human does not read the docs. The docs are the agent record. Write and edit them with [`asd-ste100`](../.agents/skills/asd-ste100/SKILL.md) (upstream skill, version 0.4.0, plus the project section). Use [`glossary.md`](glossary.md) for names. Run `scripts/ste-lint.py` on a doc you change. Do not rename `display` because the linter pairs it with `show`.

Update the one canonical file in the same slice as the behaviour change. Do not leave the fact in chat. [`AGENTS.md`](AGENTS.md) routes the agent. Do not ask the human which file to open.

### D13 — The root README is the public page

The root [`README.md`](../README.md) is the page GitHub will show. Write it for a person who finds the repository. Use ordinary words there. Do not use the glossary to rewrite it.

Do not put Cursor steps, this machine, or "do not start git" in that file. Those facts live in [`guides/local.md`](guides/local.md). Product behaviour stays in [`product/scope.md`](product/scope.md). Do not apply Strict STE to the root README.

### D14 — One Nuxt 4 process serves the glass

The host is one Nuxt 4 process (D20). The process serves the glass. The process keeps the token in `secrets/` (D8). The source is TypeScript.

`node --experimental-strip-types --test` runs the tests. `node --check` checks each source file. This slice has no type checker.

The default listen address is `0.0.0.0` (D19). Commands live in [`infrastructure/quality-gates.md`](infrastructure/quality-gates.md).

### D15 — The ground is `#000`

The ground is `#000`. On an OLED panel those pixels turn off. On an LCD the backlight stays on. Type stays off `#fff`. Tokens stay in [`DESIGN.md`](../DESIGN.md).

### D16 — The place is in `.env`. Secrets stay in `secrets/`

The weather place is `MIRROR_PLACE` in `.env`. `.env.example` lists the keys and holds no secret. Git ignores `.env` and keeps `.env.example`. The client JSON and the token stay in `secrets/` (D8).

### D17 — A Testing token lasts 7 days

A Testing token lasts 7 days. Google ends it even when the host is a Raspberry Pi on the home LAN. Open `/oauth` again after it expires. The steps are [`guides/google.md`](guides/google.md).

### D18 — Publish removes the 7-day limit. The host stays on the LAN

Publish removes the 7-day limit. The host stays on the home LAN. Publish needs a public homepage and a public privacy policy on a domain the human owns. Add that domain in Google Search Console. The pages are `brand/index.html` and `brand/privacy.html`. Do not add a logo. Do not submit the app for verification. After Publish, open `/oauth` once more. The steps are [`guides/google.md`](guides/google.md).

### D19 — The host listens on every LAN interface

The default `HOST` is `0.0.0.0`. A display on the home LAN opens the host address and port `4173`. The OAuth redirect stays `http://127.0.0.1:4173/oauth/callback`. Do not add a port forward.

### D20 — The host is Nuxt 4 with Nuxt UI

The host is one Nuxt 4 process. Nuxt UI draws the list control, the fullscreen control, empty lines, row separators, and the monochrome icons. CSS sets the ground, the type scale, and the system font. The ground stays `#000`. The process keeps the token in `secrets/` (D8). The tablet does not download a font. Build with `nuxt build`. Run the built process with `node .output/server/index.mjs` on the Raspberry Pi.

### D21 — The glass may mark a task done or open

The glass may mark a task done or open. The Tasks scope is `tasks`. The Calendar scope stays `calendar.readonly`. Open `/oauth` once after this decision so Google grants the write. The display sends the list id, the task id, and the done flag. The host writes the status. The token stays in `secrets/` (D8).
