# Money Calc

A small currency-converter calculator web app for me and a friend, used on iPhone via "Add to Home Screen". Everything is in a single file, `index.html` (no build step, no frameworks).

## What it does
- Board of currency rows (default: NPR, CNY, USD, IDR). Tap a row to make it the input; the keypad below types into it and all other rows convert live.
- Keypad supports + − × ÷ and %, with a safe hand-written evaluator (no `eval`).
- Rates update automatically and **cannot be edited by the user** (deliberate choice):
  - Fetched on open, when the app comes back to the foreground, and hourly.
  - Primary source: `https://open.er-api.com/v6/latest/USD`; backup: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`.
  - Offline: uses the last saved rates (built-in fallback rates from Nov 2026).
- "Currencies" sheet: shows read-only rates (per 1 USD), "Refresh now", add currencies by name/code search (rate comes from live data), remove with ×. Minimum 2, maximum 8 currencies.
- Hints under big amounts: CNY shows 万/亿 (e.g. 3.33万, 1.33亿); NPR shows lakh/crore (e.g. 1.51 lakh, 30.24 crore). Main numbers always use standard 3-digit commas.
- Layout always fits exactly one screen (100dvh), no scrolling. Rows share the height; long numbers shrink to fit instead of being cut off.
- User's currency list is saved in localStorage (key `moneycalc.v2`).

## Design
White board, near-black ink, one vermilion accent (#e8452c) on the active row and "=" key. Font: Inter Tight, tabular figures. Light and dark themes. Side-by-side layout on wide screens.

## Hosting plan
Cloudflare Pages via dashboard drag-and-drop (Workers & Pages → Create application → Pages → Drag and drop your files), uploading a folder containing `index.html`. No zip, no Netlify.

## Preferences
- Keep it a single HTML file.
- Don't add the hint text "Tap a currency to type in it" back.
- Don't add manual rate editing.
