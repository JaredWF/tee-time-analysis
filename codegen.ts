
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/types/types.graphql",
  documents: "src/scrapers/**/*.ts",
  generates: {
    "src/graphql/types/types.ts": {
      config: {
        useIndexSignature: true,
        contextType: '../index#Context'
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
    },
    "src/scrapers/graphqlTypes/": {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
};

export default config;
