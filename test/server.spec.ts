import {
  describe, it, expect, beforeAll, afterAll,
} from 'vitest';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import app from '../server.mjs';

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
});
