# Morning Reads

Live at https://morningreads.netlify.app

A static page with a daily list of free reading and listening links for the commute.

- `index.html` renders `data.json`. Do not edit the HTML for a daily update.
- `data.json` holds `days`, newest first, each with `date`, `label`, optional `note`, and `slots` of `{name, items:[{t,u,d,m}]}`. Keep the last 14 days.
- A scheduled Claude task adds a day each weekday morning and pushes. Netlify deploys on push. The run takes about an hour, so it starts around 5:35 am Eastern to be live by 6:50.
- Formula 1: two or three articles a day, rotating across many sites (not just The Race and PlanetF1), plus one or two F1 podcasts at the top of the Listen slot. Chequered Flag is a favorite but the point is to keep surfacing new good sources.

## Clicks

Links on the page send a beacon to `/api/clicks` (a Netlify Function backed by Netlify Blobs). `GET /api/clicks` returns counts by slot and source plus the 40 most recent clicks, which the daily task reads to lean toward what Mike actually opens.
