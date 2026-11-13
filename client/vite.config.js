import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/* Link previews (LinkedIn, Messenger...) need ABSOLUTE urls. Set VITE_SITE_URL (e.g. https://elya.vercel.app)
   in your host's environment variables or client/.env and the build fills them in.
   If it is not set, og:url / canonical are removed and the image falls back to a relative path. */
const siteMeta = url => ({
  name: 'site-meta',
  transformIndexHtml(html) {
    const base = (url || '').replace(/\/$/, '');
    if (base) return html.replaceAll('__SITE_URL__', base);
    return html
      .replace(/^.*__SITE_URL__\/">.*\n/gm, '')          // drop og:url + canonical
      .replaceAll('__SITE_URL__', '');                     // og:image / twitter:image become /assets/og.jpg
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), siteMeta(env.VITE_SITE_URL)],
    server: { proxy: { '/api': 'http://localhost:5000' } },
  };
});
