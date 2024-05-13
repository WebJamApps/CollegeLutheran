import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

describe('Puppeteer tests', () => {
  let browser: any, page: any;
  const url = process.env.PUPPET_URL || 'http://localhost:7787';
  const headless = !process.env.HEADLESS || process.env.HEADLESS === 'new' ? 'new' : false;
  beforeAll(async () => {
    console.log('headless?');
    console.log(process.env.HEADLESS);
    browser = await puppeteer.launch({ headless });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    });
  });

  afterEach(async () => {
    if (!headless) {
      await delay(2);
    }
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load College Lutheran Homepage', async () => {
    await page.goto(`${url}`);
    const title = await page.title();
    expect(title).toBe('College Lutheran Church');
  });

  it('navigate to Beliefs', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Our Lutheran Beliefs")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Our Lutheran Beliefs | College Lutheran Church');
  });

  it('navigate to Staff', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Church Staff")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Church Staff | College Lutheran Church');
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  /* it('navigate to Bulletin', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Bulletin")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Church Staff | College Lutheran Church');
  });
  */

  it('navigate to LiveStream', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Livestream")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Livestream | College Lutheran Church');
  });

  it('navigate to News', async () => {
    const newsLink = await page.waitForXPath('//span[contains(., "News")]');
    await Promise.all([
      newsLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('News | College Lutheran Church');
  });

  it('navigate to Giving', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Giving")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Giving | College Lutheran Church');
  });

  it('navigate to Music', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Music")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Music | College Lutheran Church');
  });

  it('navigate to Youth Ministry', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Youth Ministry")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Youth Ministry | College Lutheran Church');
  });

  it('navigate to Children & Families', async () => {
    const belLink = await page.waitForXPath('//span[contains(., "Children & Families")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Children & Families | College Lutheran Church');
  });
});
