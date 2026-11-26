# Money Calc

A small currency-converter calculator for the phone. Tap a currency to type in it; every other currency converts live. The keypad does + − × ÷ and %.

- Rates update on their own (on open, when you come back to the app, and hourly), from [open.er-api.com](https://open.er-api.com) with a [backup source](https://github.com/fawazahmed0/exchange-api). Offline, it uses the last saved rates.
- Add or remove currencies (2 to 8) under **Currencies**.
- Big CNY amounts also show 万/亿, and big NPR amounts show lakh/crore.

It's one file, `index.html`, with no build step. Open it in a browser, or host it anywhere static. On iPhone, use **Share → Add to Home Screen**.
