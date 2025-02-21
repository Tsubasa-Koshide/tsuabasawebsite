import { defineConfig } from 'astro/content';
import content from '@astro/content';

export default defineConfig({
  integrations: [content()],
});