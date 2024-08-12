import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:8080/graphql",
    documents: "graphql/**/*.graphql",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
            config: {
                rawRequest: true,
            },
        },
    },
};
export default config;
