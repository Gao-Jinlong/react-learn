import { Config, configUmiAlias, createConfig } from '@umijs/max/test';

export default async () => {
  try {
    return (await configUmiAlias({
      ...createConfig({
        target: 'browser',
        jsTransformer: 'esbuild',
        // config opts for esbuild , it will pass to esbuild directly
        jsTransformerOpts: { jsx: 'automatic' },
      }),

      setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
      collectCoverageFrom: [
        'src/**/*.{ts,js,tsx,jsx}',
        '!src/.umi/**',
        '!src/.umi-test/**',
        '!src/.umi-production/**',
      ],
      // transform: {
      //   '^.+\\.tsx?$': [
      //     'ts-jest',
      //     {
      //       tsconfig: {
      //         module: 'esnext', // 或 'es2015'
      //       },
      //     },
      //   ],
      // },
      // if you require some es-module npm package, please uncomment below line and insert your package name
      transformIgnorePatterns: ['node_modules/(?!.*(lodash-es)/)'],
      globals: {
        'ts-jest': {
          tsconfig: {
            extends: './src/.umi/tsconfig.json',
            compilerOptions: {
              module: 'preserve',
            },
          },
        },
      },
    })) as Config.InitialOptions;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
