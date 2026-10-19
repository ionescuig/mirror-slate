# Connect Google

A Testing token lasts 7 days (D17). Publish removes that limit (D18). The host stays on the home LAN. The public pages are not the mirror.

The client file for this machine is `secrets/client.json` (D8). Do not paste that file into chat.

## Create the client

1. Open `https://console.cloud.google.com/`.
2. Create a project named `mirror-slate`.
3. Select that project.
4. Open the Calendar API library page. Click Enable.
5. Open the Tasks API library page. Click Enable.
6. Open Google Auth Platform. Click Get started if it appears.
7. Set the app name to `mirror-slate`.
8. Set the support email to the human's Gmail.
9. Set the audience to External.
10. Do not add a logo.
11. Open Audience. Leave the status on Testing.
12. Add the same Gmail under Test users. Save.
13. Open Data Access. Add `calendar.readonly`.
14. Add `tasks`. Save. Do not add `tasks.readonly`.
15. Open Clients. Create a Web application client named `mirror-slate`.
16. Set the redirect URI to `http://127.0.0.1:4173/oauth/callback`.
17. Download the JSON on that screen. Google hides the secret after you leave.
18. Save the file as `secrets/client.json`.

## Grant access

1. Start the host. Open `http://127.0.0.1:4173/`.
2. Open `http://127.0.0.1:4173/oauth` on the host machine. Do not open `/oauth` from the tablet.
3. Choose the Gmail that owns the tasks and the calendar.
4. On the unverified-app warning, click Advanced.
5. Click Continue.
6. The browser returns to the glass. The host writes `secrets/token.json`.

Do not commit `secrets/client.json` or `secrets/token.json`.

The host renews the access token from the refresh token. A Testing refresh token still ends after 7 days. Open `/oauth` again after it expires. If the old grant used `tasks.readonly`, add `tasks`, then open `/oauth` again. Add the Gmail under Test users again if Google refuses the grant.

## Make the token last

The pages are `brand/index.html` and `brand/privacy.html`. Put both files on a public https site. The human owns that domain. Verify the domain in Google Search Console with the same Google account. The host stays on the home LAN.

1. Open Branding in Google Auth Platform.
2. Set the app name to `mirror-slate`.
3. Set the support email to the human's Gmail.
4. Put the public homepage URL in the homepage field. Use `https://` and the domain, then `/`.
5. Put the privacy URL in the privacy policy field. Use the same domain, then `/privacy.html`.
6. Put the bare domain in Authorized domains. Do not add `https://`.
7. Leave the logo empty.
8. Save.
9. Open Audience. Click Publish app.
10. Do not submit the app for verification.
11. Open `http://127.0.0.1:4173/oauth` on the host machine.
12. Click Advanced, then Continue.

The host writes a new `secrets/token.json`. That token does not use the 7-day Testing limit. Google can still end it if the human revokes the app, or if the host does not use it for six months.
