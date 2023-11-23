import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: [
          "@emotion/babel-plugin",
          [
            "@babel/plugin-proposal-decorators",
            { decoratorsBeforeExport: false },
          ],
          "@babel/plugin-transform-class-properties",
        ],
      },
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          "#000": "currentColor",
          "#000000": "currentColor",
          black: "currentColor",
        },
      },
    }),
  ],
});
