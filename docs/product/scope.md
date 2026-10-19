# Glass

The glass is the only view. The ground is black. The type is white and gray. The human puts mirror film in front of the display.

## Regions

| Region | Shows |
| --- | --- |
| Top center | Clock. The display draws the clock |
| After the clock, top right | Weather. The place name sits above today. Today is larger. A monochrome icon sits beside the temperature. The condition word stays. Feels like sits under that word. Then the next five days |
| Left | Google Calendar. The title is `Calendar`. Each day that has an event shows that day. The events sit under the day. One short place, when the event has one, sits under the time. The calendar pane hides its scrollbar. An edge row dims only when another row sits outside that pane |
| Right | Tasks. The title is `Tasks`. The list control sits on the right of that title. Open tasks fill the top two thirds. Done tasks fill the bottom third. Each third scrolls. A task pane hides its scrollbar. An edge row dims only when another row sits outside that pane. A click on the square marks that task done or open |

The account can have more than one list. The glass reads the lists. The display does not ask the human to sign in. A fullscreen icon enters fullscreen. The same icon leaves fullscreen. A refresh icon reloads the glass. The glass stays in fullscreen.

The display draws a 24-hour time. The date sits under the time. The clock has no seconds.

A missing place shows `No place set.` A failed weather fetch shows `Weather unavailable.` The glass does not invent a number. Highs are whole degrees Celsius. Feels like is today's apparent high, in whole degrees. A missing apparent high omits that line.

No lists shows `No lists.` A list with no open task shows `Nothing due.` No events shows `Nothing scheduled.` A done task stays in the bottom third.

## Displays

| Display | Role |
| --- | --- |
| Host on the Raspberry Pi | Serves the glass on the home LAN |
| Desktop browser | Shows the same glass in a wide layout |
| Galaxy Tab A7 Lite (SM-T220) | Shows the same glass. The panel is 1340×800. Use fullscreen. Landscape uses two columns and fits one page. Portrait stacks the top, then the columns |

The display reloads tasks and the calendar every 5 minutes. The display reloads weather every 15 minutes. A click sends the task status. The display then reloads the list. The task shows in the open section or the done section. A refresh icon reloads the glass at once. The clock ticks on the display.

The calendar shows at most 12 events from today through the next 6 days. The calendar is the left column. Tasks are the right column. A short wide layout uses five parts, a gap of two parts, then five parts. A taller layout uses four parts, a gap of four parts, then four parts. The event title is the bright line. Every day that has an event shows that day. The icon sits in front of the time. The time sits in front of the title. An all-day event shows `All day` in that time place. One short place sits under the title. The glass does not show the rest of the note. A day with no event stays off the glass. A cancelled event stays off the glass.

## Accounts

Connect Google once, on a machine that can finish consent. The host stores the token. The calendar scope is read-only. The tasks scope can mark a task done or open (D21). Weather needs no account.

The 7-day token limit is D4 and D5 in [`../decisions.md`](../decisions.md). What the display may receive is [`../infrastructure/safety.md`](../infrastructure/safety.md) (D9).

## Look

Tokens and type: [`../../DESIGN.md`](../../DESIGN.md). Who the glass is for: [`../../PRODUCT.md`](../../PRODUCT.md) (D10).

## Connected

The host serves the glass (D14). The weather place is `MIRROR_PLACE` in `.env` (D16). The token file is `secrets/token.json` when consent is done (D17). See [`../guides/repo-layout.md`](../guides/repo-layout.md). Git notes are [`../guides/local.md`](../guides/local.md) (D2).
