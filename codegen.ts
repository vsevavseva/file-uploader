import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: 'http://188.225.32.102:3000/graphql',
    documents: ["src/**/*.graphql"],
    generates: {
        "./src/__generated__/graphql.ts": {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                withHooks: true
            },
        }
    }
};

export default config;