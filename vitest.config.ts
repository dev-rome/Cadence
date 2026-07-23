import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.join(dirname, "src/test/setup.ts")],
    css: true,
    env: {
      NEXT_PUBLIC_SANITY_GRAPHQL_URL:
        "https://test-project.api.sanity.io/v2023-08-01/graphql/production/default",
    },
  },
});
