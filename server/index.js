import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' } });

const clean = (v, max) => String(v ?? '').trim().slice(0, max);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mailer = process.env.SMTP_HOST && process.env.SMTP_USER
  ? nodemailer.createTransport({ host: process.env.SMTP_HOST, port: +process.env.SMTP_PORT || 465,
      secure: (+process.env.SMTP_PORT || 465) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
  : null;

app.post('/api/contact', limiter, async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true });                 // honeypot: bots fill this, silently drop
  const m = { first_name: clean(b.first_name, 60), last_name: clean(b.last_name, 60), email: clean(b.email, 120),
              phone: clean(b.phone, 30), message: clean(b.message, 3000) };
  if (!m.first_name || !m.last_name || !m.message) return res.status(400).json({ error: 'Please fill in all required fields.' });
  if (!emailRe.test(m.email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  try {
    if (mailer) {
      await mailer.sendMail({ from: process.env.SMTP_USER, to: process.env.MAIL_TO || process.env.SMTP_USER, replyTo: m.email,
        subject: `Portfolio message from ${m.first_name} ${m.last_name}`,
        text: `${m.message}\n\n— ${m.first_name} ${m.last_name}\n${m.email}\n${m.phone}` });
    } else {
      await appendFile(path.join(__dirname, 'messages.json'), JSON.stringify({ ...m, at: new Date().toISOString() }) + '\n');
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('contact error:', err.message);
    res.status(500).json({ error: 'Could not send your message right now.' });
  }
});

app.get('/api/health', (_, res) => res.json({ ok: true }));

// Production: serve the built React app from the same server
const dist = path.join(__dirname, '../client/dist');
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
