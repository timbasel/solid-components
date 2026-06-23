import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";
import { defineConfig } from "vite";
import { remarkLiveCode } from "./utils/remark-live-code";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/solid-components" : "",
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkLiveCode],
        rehypePlugins: [rehypePrettyCode],
      }),
      enforce: "pre",
    },
    solidStart({
      extensions: ["mdx", "md"],
    }),
    tailwindcss(),
    nitro({
      preset: "github-pages",
      static: true,
    }),
  ],
}));
