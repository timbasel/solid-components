import { solidStart } from "@solidjs/start/config";
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const isProduction = process.env.NODE_ENV === "production";
const base = isProduction ? "/solid-components" : "/";

export default defineConfig({
  base,
  plugins: [
    solidStart(),
    tailwindcss(),
    nitro({
      preset: "github-pages",
      static: true,
    }),
  ],
});
