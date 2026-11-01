import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/.
// Set GITHUB_PAGES=true to produce a fully static SPA build for GitHub Pages.
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBase = process.env.GITHUB_PAGES_BASE ?? "/game-haven-hub/";

export default defineConfig(({ command, mode }) => ({
  base: isGitHubPages ? githubPagesBase : "/",
  plugins: [
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // GitHub Pages can only serve static files, so render the app shell at
      // build time and let the client router take over.
      ...(isGitHubPages ? { spa: { enabled: true } } : {}),
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
    command === "serve" && mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: "::",
    port: 8080,
  },
}));
