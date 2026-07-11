import { defineConfig } from "tsdown";
import solid from "unplugin-solid/rolldown";

const entry = ["./src/index.ts", "./src/*.tsx"];

export default defineConfig([
  {
    entry,
    platform: "browser",
    dts: true,
    copy: ["./src/style.css"],
    plugins: [solid({ solid: { generate: "dom", hydratable: true } })],
  },
  {
    entry,
    platform: "node",
    dts: false,
    outDir: "dist/server",
    outExtensions: () => ({ js: ".js" }),
    plugins: [solid({ solid: { generate: "ssr", hydratable: true } })],
  },
  {
    entry,
    platform: "browser",
    dts: false,
    outDir: "dist/solid",
    inputOptions: { transform: { jsx: "preserve" } },
    outExtensions: () => ({ js: ".jsx" }),
  },
]);
