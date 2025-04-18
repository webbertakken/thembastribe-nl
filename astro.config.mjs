// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
  integrations: [react()],

  // Image optimization settings
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    domains: [],
    remotePatterns: [],
  },
});
