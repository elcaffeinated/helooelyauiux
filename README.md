# Portfolio: React + Node.js (traditional CSS)
```
npm run install:all                  # installs root, client and server (do this once)
cp server/.env.example server/.env   # optional: SMTP details for real email
npm run dev                          # web http://localhost:5173  api http://localhost:5000
```
Production: `npm run build && npm start`.
Form messages go to POST /api/contact; without SMTP they are saved to server/messages.json.

## CSS notes
client/src/styles.css is plain traditional CSS: one property per line, fixed px values,
media queries at 1200 / 992 / 768 / 576 / 400 px. Neon colours are classes
(.svc-teal, .proj-pink, .dot-purple ...). Hero and blob sizes are in the
"HERO" and "BREAKPOINTS FOR THE HERO" sections.
