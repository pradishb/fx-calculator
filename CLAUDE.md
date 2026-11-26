# Money Calc

A small currency-converter calculator web app for me and a friend, used on iPhone via "Add to Home Screen". It's a PWA. The whole app is in `index.html` (no build step, no frameworks); the other files only make it installable and work offline:

- `manifest.webmanifest`: name, colors and icons for installing.
- `sw.js`: service worker. App files are served from the cache straight away and refreshed in the background (updates show on the next open); rate requests aren't touched. Don't make the page network-first again: on a slow connection every open then waits for the network. Bump `CACHE` in it when the list of app files changes.
- `inter-tight.woff2`: the font (Inter Tight, latin, variable 400–700), self-hosted and preloaded so there's no wait on Google Fonts.
- `icon.svg`: the icon (vermilion "=" key with a $ coin). `icon-maskable.svg` is the same art, smaller, inside Android's safe zone. The PNGs (`apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`, `icon-maskable-192.png`, `icon-maskable-512.png`) are rendered from them; re-render them if the SVGs change.

## What it does
- Board of currency rows (default: NPR, CNY, USD, IDR). Tap a row to make it the input; the keypad below types into it and all other rows convert live.
- Keypad supports + − × ÷ and %, with a safe hand-written evaluator (no `eval`).
- Rates update automatically and **cannot be edited by the user** (deliberate choice):
  - Fetched on open, when the app comes back to the foreground, and hourly.
  - Primary source: `https://open.er-api.com/v6/latest/USD`; backup: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`.
  - Offline: the app opens from the service worker's cache and uses the last saved rates (built-in fallback rates from Nov 2026).
- "Currencies" sheet: shows read-only rates (per 1 USD), "Refresh now", add currencies by name/code search (rate comes from live data), remove with ×, and reorder by dragging a row's ≡ handle (touch or mouse; arrow keys on the handle also work). The board uses the same order. Minimum 2, maximum 8 currencies.
- Hints under big amounts: CNY shows 万/亿 (e.g. 3.33万, 1.33亿); NPR, INR, PKR and BDT show lakh/crore (e.g. 1.51 lakh, 30.24 crore); every other currency shows thousand/million/billion/trillion (e.g. 12.5 thousand, 1.4 million). Main numbers always use standard 3-digit commas.
- Keypad has a `000` key (no `00`). It never makes leading zeros.
- Zoom is off (no pinch or double-tap zoom), so fast repeated taps on keys always type.
- Copy/paste: long-press a row (or right-click) for a menu with Copy and Paste; Ctrl/Cmd+C copies the active row and Ctrl/Cmd+V pastes into it. Copy gives a plain number (1403488.5) so it pastes cleanly into other apps. Paste reads common formats (1,403,488.50, 1.403.488,50, Rp 1 403 488, $12.5) and makes that row active. A small toast with a check mark confirms each one. The menu and toast are styled like iOS's edit menu (frosted, thin dividers); no black boxes or outlines.
- Text can't be selected anywhere (no iOS selection handles or callouts), except in the currency search box.
- Layout always fits exactly one screen (100dvh), no scrolling. Rows share the height; long numbers shrink to fit instead of being cut off.
- User's currency list is saved in localStorage (key `moneycalc.v2`).

## Design
White board, near-black ink, one vermilion accent (#e8452c) on the active row and "=" key. Font: Inter Tight (self-hosted, `inter-tight.woff2`), tabular figures. Light and dark themes. Side-by-side layout on wide screens.

## Hosting
Live at https://calc.pradish.com.np, a Cloudflare Worker (`money-calc`) that serves the folder as static files (`wrangler.jsonc`). Deploy with `npx wrangler deploy` from this folder; wrangler needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (in bws as `cf-account-api-token` and `cf-account-id`). Files that aren't part of the site (docs, config) are listed in `.assetsignore`; add new ones there. No Netlify. The service worker only runs over https, not when `index.html` is opened as a file.

## Preferences
- Keep all the app's code in `index.html`; other files are only for the PWA (manifest, service worker, icons, font).
- Don't add the hint text "Tap a currency to type in it" back.
- Don't add manual rate editing.
