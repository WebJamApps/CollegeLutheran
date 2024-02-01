import puppeteer from 'puppeteer';

describe('Puppeteer tests', () => {
  let browser: any, page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, args: ['--window-size=1280,780'] });
    page = await browser.newPage();
    // await page.setViewport({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load Google homepage', async () => {
    await page.goto('https://www.google.com');
    const title = await page.title();
    expect(title).toBe('Google');
  });

  it('should load College Lutheran Homepage', async () => {
    await page.goto('https://www.collegelutheran.org/');
    const title = await page.title();
    expect(title).toBe('College Lutheran Church');
  });

  it('navigate to College Lutheran Beliefs', async () => {
    await page.goto('https://www.collegelutheran.org/');
    await page.waitForSelector('.nav-link');
    const pageButton = await page.$('.nav-link');
    await pageButton.click();
    const title = await page.title();
    expect(title).toBe('Our Lutheran Beliefs');
  });
// eslint-disable-next-line eol-last
});