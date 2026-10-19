# mirror-slate

A single dark page for a wall or a desk. It shows the time, the weather, Google Tasks, and Google Calendar. The type stays light on black so the page can sit behind mirror film.

The page is meant to be read in a glance, on a desktop and on a small tablet (1340×800).

## What you see

- The time, at the top center. The date sits under it. There are no seconds.
- The weather beside it: today larger, with an icon, then the next five days.
- Your Google Calendar on the left. Several events on the same day share one date.
- Your Google tasks on the right. Open tasks fill the top. Done tasks sit in the bottom third. Click the box to mark a task done, or to open it again. If you have more than one list, switch lists next to the title.
- Two icons in the top left. One enters fullscreen and leaves it. One reloads tasks, the calendar, and the weather without leaving fullscreen.

There is no login on the display. You connect Google once, on the computer that runs the page.

Weather does not need a Google account. The clock runs in the browser. Tasks and the calendar reload every 5 minutes. Weather reloads every 15 minutes. Checking a task sends the status, then the list reloads. The task shows as open or done after that reload.

## Get started

You need Node 24. Run the page on a Raspberry Pi: [Run the host](docs/guides/host.md).

Connect Google on that same machine: [Connect Google](docs/guides/google.md).

## Privacy

The Google token stays on the machine that serves the page. The browser only receives the text it shows. Keep the page on the home network. Do not forward port 4173. The detail is [Safety](docs/infrastructure/safety.md).

## How it was built

Most of this project was vibecoded with a coding agent. The harness is the tests, the lint check, and the docs and rules in this repo. They are what keep that work in line.

## Develop

People and coding agents start at [AGENTS.md](AGENTS.md).
