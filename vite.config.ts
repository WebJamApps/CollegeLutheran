/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import pkg from './package.json';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));
const certDir = fileURLToPath(new URL('./.certs', import.meta.url));

// Opt-in local HTTPS for the dev server: `DEV_HTTPS=true npm run dev`.
// Needed to exercise the admin "Reconnect Facebook" button locally, because
// Facebook's FB.login refuses to run on http:// pages. Off unless the flag is
// set AND the self-signed certs exist (see README / .certs is gitignored), so
// CI and production builds are unaffected.
function devHttps(env: Record<string, string>) {
  const enabled = (process.env.DEV_HTTPS ?? env.DEV_HTTPS) === 'true';
  const key = `${certDir}/localhost.key`;
  const cert = `${certDir}/localhost.crt`;
  if (!enabled || !fs.existsSync(key) || !fs.existsSync(cert)) return undefined;
  return { key: fs.readFileSync(key), cert: fs.readFileSync(cert) };
}

const APP_ENV_KEYS = [
  'BackendUrl',
  'GoogleClientId',
  'HashString',
  'TINY_KEY',
  'CHANNEL_ID',
  'userRoles',
  'NODE_ENV',
  'FB_APP_ID',
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
      ...(devHttps(env) ? { https: devHttps(env) } : {}),
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
