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

## Before you deploy (checklist)
1. `client/src/data/site.js`: fill in full name, location, graduation, resume path and social URLs.
   Anything left empty is hidden automatically (no dead links).
2. Put your resume at `client/public/resume.pdf` and set `resume: '/resume.pdf'` in site.js.
3. Copy `client/.env.example` to `client/.env` (or set the same variables on Vercel/Netlify):
   - `VITE_SITE_URL`: your live URL (fixes link previews).
   - `VITE_FORM_ENDPOINT`: a Formspree URL so the contact form works on static hosting.
     Without it the form posts to `/api/contact`, which only exists when the Node server is running.
