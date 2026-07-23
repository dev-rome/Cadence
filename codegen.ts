import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL,
  documents: ["src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
