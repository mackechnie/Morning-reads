# Morning Reads

Live at https://morningreads.netlify.app

A static page with a daily list of free reading and listening links for the commute.

- `index.html` renders `data.json`. Do not edit the HTML for a daily update.
- `data.json` holds `days`, newest first, each with `date`, `label`, optional `note`, and `slots` of `{name, items:[{t,u,d,m}]}`. Keep the last 14 days.
- A scheduled Claude task adds a day each weekday morning and pushes. Netlify deploys on push.
