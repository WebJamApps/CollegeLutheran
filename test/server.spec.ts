import {
  describe, it, expect, beforeAll, afterAll,
} from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from '../server.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('server.mjs', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => resolve());
    });
    const { port } = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it('sets Cross-Origin-Opener-Policy: same-origin-allow-popups on every response', async () => {
    const res = await fetch(`${baseUrl}/any-path`);
    expect(res.headers.get('cross-origin-opener-policy')).toBe('same-origin-allow-popups');
  });

  it('sets the COOP header on the root path as well', async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get('cross-origin-opener-policy')).toBe('same-origin-allow-popups');
  });

  it('sets Cache-Control: no-store on the root path', async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get('cache-control')).toBe('no-store');
  });

  it('sets Cache-Control: no-store on an arbitrary SPA route', async () => {
    const res = await fetch(`${baseUrl}/any-path`);
    expect(res.headers.get('cache-control')).toBe('no-store');
  });

  it('sets Cache-Control: public, max-age=31536000, immutable on a hashed asset file', async () => {
    const assetsDir = path.join(__dirname, '..', 'dist', 'assets');
    const [assetFile] = readdirSync(assetsDir);
    const res = await fetch(`${baseUrl}/assets/${assetFile}`);
    const cacheControl = res.headers.get('cache-control');
    expect(cacheControl).toContain('max-age=31536000');
    expect(cacheControl).toContain('immutable');
  });
});
