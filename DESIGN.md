---
name: mirror-slate
description: Black glass for a hallway glance through mirror film.
colors:
  ground: "#000"
  surface: "#1c2024"
  text: "#f3f5f6"
  text-muted: "#c5cdd3"
  text-faint: "#8b969e"
  line: "#2a3036"
  focus: "#f3f5f6"
typography:
  clock:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  today:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.3
    letterSpacing: "normal"
  meta:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 450
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  control: "8px"
spacing:
  page: "1.5rem"
  row: "0.75rem"
  region: "2rem"
components:
  task-row:
    textColor: "{colors.text}"
    typography: "{typography.body}"
    padding: "0.75rem 0"
  event-row:
    textColor: "{colors.text}"
    typography: "{typography.body}"
    padding: "0.75rem 0"
  list-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1rem"
    height: "48px"
---

<!-- The glass is in app/. Re-run document in scan mode after a look change. -->

## Overview

The human sees the glass through mirror film, on a dim 8.7 inch tablet and on a desktop. Room light is ordinary. Attention lasts a few seconds. The panel tops out near 360 nits. The palette is silver-black because the film is silver-black. The strategy is Restrained: tinted neutrals and no accent hue. Size shows importance. The clock is the largest text. Today's weather is next. Tasks and events are lines.

## Colors

Neutrals lean slightly cool, toward the film. Chroma is about 0.008. That tint matches the glass. The tint is not a blue dashboard.

| Token | Hex | Use |
| --- | --- | --- |
| `ground` | `#000` | Glass background. On OLED the pixel turns off |
| `surface` | `#1c2024` | The list control only |
| `text` | `#f3f5f6` | Clock, today, open task titles, event titles. The bright shade. Not `#fff` |
| `text-muted` | `#8b939a` | Dates, temperatures, due dates, and the other five days. The quiet shade |
| `text-faint` | `#5c656c` | Region titles and done tasks. The dim shade. Do not use this token below meta size |
| `line` | `#2a3036` | A 1px separator between rows, when a row needs a separator |
| `focus` | `#f3f5f6` | Focus ring on the list control |

Three shades carry the glass. `text` is the bright shade. `text-muted` is the quiet shade. `text-faint` is the dim shade, and only a region title uses it.

Do not add green or red until the glass can complete a task. A weather icon is one monochrome mark. Do not use a weather-icon rainbow.

## Typography

Use one family: `ui-sans-serif, system-ui, sans-serif`. The tablet must not download a font.

| Role | Size | Use |
| --- | --- | --- |
| `clock` | 4.5rem | Time only |
| `today` | 2rem | Today's weather |
| `body` | 1rem | Task titles and event titles |
| `meta` | 0.875rem | Due dates, event times, and event details |
| `forecast` | 0.875rem | The five days. Today stays on the `today` role |

Use fixed rem. Do not use fluid type. On a portrait width under 800px, drop the clock to 3.25rem if 4.5rem wraps. When the height is 800px or less and the width is over 800px, the glass is one page. Set the clock to 4rem. Keep the date at 1.125rem. Today keeps the `today` size for that height. The five days stay on `forecast`. The calendar fills the left five parts. A gap of two parts sits between the columns. Tasks fill the right five parts. When the height is over 800px, each column is four parts and the gap is four parts. Each column scrolls. Do not shrink a task title or an event title below 1rem.

## Elevation

Keep the glass flat. Do not add a shadow, a blur, or a glass card. The mirror film is already the glass. A second translucent layer turns type gray.

Put the list control on `surface` with a 1px `line` border. Put every other element as type on `ground`.

## Components

**Clock.** Show one time. Do not show seconds if the seconds shimmer through the film. Do not put the date on the same line as the time. Put the date under the time at 1.125rem.

**Region title.** `Tasks` and `Calendar` use uppercase type at 1.125rem in `text-faint`. A 1px `line` sits under the title. The list control sits on the right of `Tasks`.

**Weather.** The place name sits above today in `text-muted`. Today uses the `today` role for the temperature. The condition word sits under it in `text-muted`. `Feels like` sits under that word in `meta`, when the apparent high exists. A monochrome icon sits beside the temperature. The word stays. The next five days use `forecast` type and a smaller icon. They are a horizontal row on a wide display. Stack the five days when the width is under 800px. Each day is a name, a monochrome icon, a mark, and a high. Use the same alignment. Do not use five cards.

**Tasks.** The column is on the right. The title is `Tasks`. The list control is at least 48px tall and sits on the right of that title. The options are the list names. Open tasks fill the top two thirds. Done tasks fill the bottom third. Each third scrolls on its own. A task pane hides its scrollbar. The first visible row dims when a row sits above the pane. The last visible row dims when a row sits below the pane. When every row fits, no row dims. An open row shows a square, then the title in `text`, then a due date in `text-muted`. A done row shows a checked square and the title in `text-faint`. Do not draw a line between task rows. A click on the square marks that task done or open (D21).

**Calendar.** The column is on the left. The title is `Calendar`. Show only days that have an event. Every such day has one date line, including a day with one event. Indent the events under that line. A monochrome calendar icon starts the row, on the title line. The time follows the icon in `text-muted`. The title follows the time in `text`. An all-day event shows `All day` in that time place. Put one short place under the title in `text-muted`, when the event has a place. Do not show the rest of the note. The calendar pane hides its scrollbar. The first visible row dims when a row sits above the pane. The last visible row dims when a row sits below the pane. When every row fits, no row dims. Do not draw a line between event rows. When there are no events, show one line: `Nothing scheduled.`

**Controls.** Two icon controls sit at the top left. They are not a fifth region. One icon enters fullscreen. In fullscreen that icon leaves fullscreen. The other icon reloads tasks, the calendar, and the weather. The glass stays in fullscreen. Each control is 48px. The icon uses the bright shade. The name stays on the control.

**Motion.** Update the clock in place. Do not play a load sequence. `prefers-reduced-motion` changes nothing else, because nothing else moves.

## Do's and Don'ts

Keep the four regions from `docs/product/scope.md`: clock, weather, tasks, calendar.

Check 1340×800 and 800×1340 in fullscreen, and check a desktop width.

Leave type on the black ground. A row separator is optional and is 1px.

Do not use `#fff`, gradient text, a side-stripe border, an icon-card grid, or blur. The ground is `#000`.

Do not add a module, a ticker, a compliment, or a photo.

Do not encode status with color until the glass can complete a task. Until then, status is words.
