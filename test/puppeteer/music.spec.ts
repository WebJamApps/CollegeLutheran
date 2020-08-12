import 'core-js/stable';
import 'regenerator-runtime/runtime';

describe('Music', () => {
  it('should be titled "Music | College Lutheran Church"', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:7787/music', { waitUntil: 'load' });
    await expect(page.title()).resolves.toMatch('Music | College Lutheran Church');
  });
});
