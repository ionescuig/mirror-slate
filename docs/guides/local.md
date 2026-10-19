# Local setup

This file is for the agent on this machine. The public description is the root [`README.md`](../../README.md) (D13). Do not copy these steps into that file.

- Open `mirror-slate/` as the only Cursor workspace root.
- Do not run `git init`, commit, or add a remote until the human asks (D2). A later GitHub publish uses the root README as the repository front page.
- Put the secret and the token in `secrets/` when they exist. Do not invent either value (D8).
- `MIRROR_PLACE` in `.env` is the weather town. The template is `.env.example` (D16). Do not write the town name in this file.
- The Google client file is `secrets/client.json`. Consent steps are [`google.md`](google.md) (D17).
- The token file is `secrets/token.json` when consent is done. A Testing token lasts 7 days (D17). Publish removes that limit (D18).
- The host needs Node 24. Git ignores `.tools/`. Do not install Node with `apt`.
- Start the host with `npm run dev` (D20). The host listens on `0.0.0.0` (D19). Open `http://127.0.0.1:4173/`. Pi steps are [`host.md`](host.md).
- The first host is a Raspberry Pi on the home LAN. One display is a desktop. The wall display is a Galaxy Tab A7 Lite (SM-T220), 8.7 inch, 1340×800. Those targets are also in [`../product/scope.md`](../product/scope.md) and D7.
