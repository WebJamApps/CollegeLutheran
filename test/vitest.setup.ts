import { config } from 'dotenv';
import { expect, vi } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);

config();

// Vite's `define` block is empty in test mode, so stub the build-time version global.
(globalThis as Record<string, unknown>).__APP_VERSION__ = 'test';

vi.mock('@mui/material');
vi.mock('@tinymce/tinymce-react');

global.ResizeObserver = class {
  observe(): void { /* no-op */ }
  unobserve(): void { /* no-op */ }
  disconnect(): void { /* no-op */ }
} as unknown as typeof ResizeObserver;

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

document.body.innerHTML = '<div id="root"><div id="mAndP"></div><div id="play-buttons">'
  + '</div><div id="share-buttons"></div><div id="googleMap"></div></div>';
window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };

(globalThis as any).jest = vi;
