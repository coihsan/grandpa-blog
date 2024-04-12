import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import compressor from "astro-compressor";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  integrations: [mdx(), sitemap(), icon({iconDir: "src/assets/icons"}), compressor(), tailwind(), alpinejs()],
  output: "server",
  adapter: vercel()
});