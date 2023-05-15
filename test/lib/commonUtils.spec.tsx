/* eslint-disable @typescript-eslint/no-explicit-any */
import commonUtils, { delay } from '../../src/lib/commonUtils';

describe('commonUtils', () => {
  it('calls scrollIntoView', () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    document.body.innerHTML = '<div class="page-content"></div>';
    commonUtils.setTitleAndScroll('home');
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
  it('sets delay for notification', async () => {
    const start = Date.now();
    await delay(1);
    const end = Date.now();
    const diff = end - start;
    expect(diff).toBeGreaterThanOrEqual(1000);
  });
});
