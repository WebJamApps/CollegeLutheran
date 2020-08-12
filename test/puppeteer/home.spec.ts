import 'core-js/stable';
import 'regenerator-runtime/runtime';

describe('Home', () => {
  it('should be titled "College Lutheran Church"', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:7787/', {
      waitUntil: 'load',
    });
    await expect(page.title()).resolves.toMatch('College Lutheran Church');
  });
});
