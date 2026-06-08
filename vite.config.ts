/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import pkg from './package.json';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

const APP_ENV_KEYS = [
  'BackendUrl',
  'GoogleClientId',
  'HashString',
  'TINY_KEY',
  'CHANNEL_ID',
  'userRoles',
  'NODE_ENV',
] as const;

export default defineConfig(async ({ mode }) => {
  const env: Record<string, string> = { ...loadEnv(mode, process.cwd(), ''), NODE_ENV: mode };
  const isTest = mode === 'test' || process.env.VITEST;

  const defines = APP_ENV_KEYS.reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(env[key] ?? '');
    return acc;
  }, {} as Record<string, string>);

  // Playwright e2e specs live under test/e2e — keep Vitest out of them. Lazy
  // import vitest/config (a devDep) only in test mode so a prod `--omit=dev`
  // build never resolves it.
  const testExclude = isTest
    ? [...(await import('vitest/config')).configDefaults.exclude, 'test/e2e/**']
    : ['test/e2e/**'];

  return {
    plugins: [
      ...(isTest ? [] : [checker({ typescript: { tsconfigPath: './tsconfig.prod.json' } })]),
      react(),
    ],
    define: isTest ? {} : {
      ...defines,
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    server: {
      port: Number(env.PORT) || 7777,
    },
    resolve: {
      alias: { src: srcDir },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./test/vitest.setup.ts'],
      css: false,
      mockReset: true,
      testTimeout: 40000,
      include: ['test/**/*.{test,spec}.{ts,tsx}'],
      exclude: testExclude,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/Main.tsx', 'src/redux/store/index.ts', 'src/containers/HabitatProject/**'],
      },
    },
  } as any;
});
