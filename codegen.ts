
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/types/types.graphql",
  generates: {
    "src/graphql/types/types.ts": {
      config: {
        useIndexSignature: true,
        contextType: '../index#Context'
      },
      plugins: ["typescript", "typescript-resolvers"],
    }
  }
};

export default config;
