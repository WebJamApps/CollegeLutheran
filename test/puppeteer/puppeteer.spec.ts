import puppeteer from 'puppeteer';

describe('Puppeteer tests', () => {
  let browser: any, page: any;
  const port = Number(process.env.PORT) + 10;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: Boolean(process.env.HEADLESS) });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load College Lutheran Homepage', async () => {
    await page.goto(`https://localhost:${port}`);// make this an env variable
    const title = await page.title();
    expect(title).toBe('College Lutheran Church');
  });

  it('navigate to Beliefs', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Our Lutheran Beliefs")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Our Lutheran Beliefs | College Lutheran Church');
  });

  it('navigate to Staff', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
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
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Livestream")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Livestream | College Lutheran Church');
  });

  it('navigate to News', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const newsLink = await page.waitForXPath('//span[contains(., "News")]');
    await Promise.all([
      newsLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('News | College Lutheran Church');
  });

  it('navigate to Giving', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Giving")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Giving | College Lutheran Church');
  });

  it('navigate to Music', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Music")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Music | College Lutheran Church');
  });

  it('navigate to Youth Ministry', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Youth Ministry")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Youth Ministry | College Lutheran Church');
  });

  it('navigate to Children & Families', async () => {
    await page.goto(`https://localhost:${port}`, { waitUntil: 'networkidle0' });
    const belLink = await page.waitForXPath('//span[contains(., "Children & Families")]');
    await Promise.all([
      belLink.evaluate((el: { click: () => any; }) => el.click()),
      page.waitForNavigation(),
    ]);
    const title = await page.title();
    expect(title).toBe('Children & Families | College Lutheran Church');
  });

// eslint-disable-next-line eol-last
});
