# Morning Reads

Live at https://morningreads.netlify.app

A static page with a daily list of free reading and listening links for the commute.

- `index.html` renders `data.json`. Do not edit the HTML for a daily update.
- `data.json` holds `days`, newest first, each with `date`, `label`, optional `note`, and `slots` of `{name, items:[{t,u,d,m}], more:[{t,u,d,m}]}`. `items` are the top picks shown up front; `more` (optional) holds about twice as many extras, best first, folded under a "N more" toggle in each slot. Keep the last 14 days.
- A scheduled Claude task adds a day each morning and pushes. Netlify deploys on push. Each run gathers about three times the shown count per slot, so it starts at 3:45 am Eastern to be live by 6:00.
- Formula 1: two or three articles a day, rotating across many sites (not just The Race and PlanetF1), plus one or two F1 podcasts at the top of the Listen slot. Chequered Flag is a favorite but the point is to keep surfacing new good sources.

## Clicks

Links on the page send a beacon to `/api/clicks` (a Netlify Function backed by Netlify Blobs). `GET /api/clicks` returns counts by slot, source, and pick (`top` or `more`, which shows whether the top picks are the right ones) plus the 40 most recent clicks, which the daily task reads to lean toward what Mike actually opens.

## No spoilers

Mike watches F1 sessions and Packers games on delay. A "Game day, no spoilers" slot leads the day whenever there was a session, game, or big news, saying only that it happened, with a link to the recap. Nothing anywhere on the page may reveal a result.
