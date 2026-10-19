# Run the host

The host is one process on a Raspberry Pi. A display opens the page. The display does not run the host.

You need Node 24.

1. Copy `.env.example` to `.env`.
2. Run `npm install`.
3. Run `npm run build`.
4. Run `npm start`.

The host listens on `0.0.0.0` and port `4173`. `.env.example` sets `HOST=0.0.0.0`. Keep that value. Do not set `HOST` to the tablet address. Do not set `HOST` to `127.0.0.1`.

On the Pi, open `http://127.0.0.1:4173/`. On a display on the same Wi-Fi, open the Pi address and port `4173`. An example is `http://192.168.0.20:4173/`. Run `hostname -I` on the Pi to read that address.

`npm run dev` uses the same address and port. On the Pi, use `npm start`.

Set `MIRROR_PLACE` in `.env`. A town name is enough. The template uses `Town, UK`.

The token and the secret stay in `secrets/`. The display receives the text it shows. Do not add a port forward. Do not publish the host on the public internet. Detail is [`../infrastructure/safety.md`](../infrastructure/safety.md).

Check the source with `npm test` and `npm run lint`.

Connect Google with [`google.md`](google.md).
