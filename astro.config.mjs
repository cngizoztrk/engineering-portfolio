import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Kendi alan adın alınınca bu satırı değiştir (sitemap/robots/JSON-LD hepsi bunu kullanır):
  site: 'https://engineering-portfolio.pages.dev',
  integrations: [sitemap()],
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
