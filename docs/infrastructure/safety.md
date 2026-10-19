# Safety

The glass shows private tasks and a private calendar. The risk boundary is the home LAN. The boundary is not the public internet.

## Token

Keep the token and the secret on the host, in `secrets/` (D8). The display receives rendered fields only: task titles, due dates, event titles, event times, and weather.

Do not put the secret, the token, or a long-lived access token in the glass. The display calls the host on the same origin. That call is the only data path.

Keep the calendar scope `calendar.readonly`. The tasks scope is `tasks` (D21). The host may write a task status. The host does not write the calendar.

## Network

Bind the host to `0.0.0.0` (D19). A display on the home LAN opens the host address and port `4173`. The OAuth redirect stays `http://127.0.0.1:4173/oauth/callback`. Do not publish the host with a port forward, a tunnel, or a public hostname.

The display has no login (D3). A person on that LAN who opens the URL can read the tasks and the calendar. Accept that risk on the home LAN. Do not accept that risk on a shared network or a guest network.

## Logs and cache

A log names the request. A log does not print the token, the secret, or a response body. Put a rendered cache, if you add one, under `data/`. Git ignores `data/`. Do not use `data/` as a second `secrets/`.

## Google project

A Testing token lasts 7 days (D17). Publish removes that limit (D18). Do not add a logo. Do not submit the app for verification. Do not add a scope beyond `calendar.readonly` and `tasks` (D21). Do not commit the client JSON. The steps are [`../guides/google.md`](../guides/google.md).

## Files

`.env` holds `MIRROR_PLACE` and the file paths (D16). `.env.example` is the template. Do not put a secret value in `.env.example`.
