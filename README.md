# FX Calculator

A small currency-converter calculator for the phone. Tap a currency to type in it; every other currency converts live. The keypad does + − × ÷ and %.

- Rates update on their own (on open, when you come back to the app, and hourly), from [open.er-api.com](https://open.er-api.com) with a [backup source](https://github.com/fawazahmed0/exchange-api). Offline, it uses the last saved rates.
- Add or remove currencies (2 to 8) under **Currencies**.
- Big CNY amounts also show 万/亿, and big NPR amounts show lakh/crore.

Live at **https://calc.pradish.com.np**.

It's a PWA with no build step: the app is `index.html`, plus a manifest, a service worker and icons. It's hosted as a Cloudflare Worker; deploy with `npx wrangler deploy`. Any static host over https works too. To install it:

- **iPhone:** in Safari, **Share → Add to Home Screen**.
- **Android / desktop Chrome or Edge:** the **Install** option in the browser menu.

Once it's been opened, it also opens offline, with the last saved rates.
