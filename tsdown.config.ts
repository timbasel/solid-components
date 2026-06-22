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
    platform: "browser",
    dts: false,
    inputOptions: { transform: { jsx: "preserve" } },
    outExtensions: () => ({ js: ".jsx" }),
  },
]);
