// Prepares the static TanStack Start SPA build in dist/client for GitHub Pages.
//
// GitHub Pages has no server-side rewrites, so:
//   - index.html is the SPA shell for the site root
//   - 404.html is the same shell, served for any deep link (e.g. /games)
//   - .nojekyll stops Pages from stripping files/folders that start with "_"
import { access, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const clientDir = path.resolve("dist", "client");
const shellPath = path.join(clientDir, "_shell.html");

try {
  await access(shellPath);
} catch {
  console.error(
    "Could not find dist/client/_shell.html.\n" +
      "Run the build with GITHUB_PAGES=true so SPA mode is enabled:\n" +
      "  GITHUB_PAGES=true npm run build",
  );
  process.exit(1);
}

for (const fileName of ["index.html", "404.html"]) {
  await copyFile(shellPath, path.join(clientDir, fileName));
  console.log(`Created dist/client/${fileName}`);
}

await writeFile(path.join(clientDir, ".nojekyll"), "");
console.log("Created dist/client/.nojekyll");
console.log("GitHub Pages build is ready in dist/client");
