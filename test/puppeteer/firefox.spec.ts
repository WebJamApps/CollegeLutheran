/* used to test firefox implementaion delete when implmented to main */
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

describe('Puppeteer tests', () => {
  let browser: any, page: any;
  const headMode = !process.env.HEADLESS || process.env.HEADLESS === 'new' ? 'new' : false;
  const browChoice = !process.env.PUPPETEER_PRODUCT || process.env.PUPPETEER_PRODUCT === 'chrome' ? 'chrome' : 'firefox';
  beforeAll(async () => {
    browser = await puppeteer.launch({ product: browChoice, headless: headMode });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    });
  });

  afterEach(async () => {
    if (!headMode) {
      await delay(2);
    }
  });

  afterAll(async () => {
    await browser.close();
  });
  it('should load google homepage', async () => {
    await page.goto('https://www.google.com/');
    const title = await page.title();
    expect(title).toBe('Google');
  });
});
