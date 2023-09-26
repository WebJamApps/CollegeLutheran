/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from 'react-notifications-component';
import commonUtils, { NotificationType } from '../../src/lib/commonUtils';

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
    await commonUtils.delay(1);
    const end = Date.now();
    const diff = end - start;
    expect(diff).toBeGreaterThanOrEqual(1000);
  });
  it('calls addNotification', () => {
    Store.addNotification = jest.fn();
    const title = '';
    const message = '';
    const type: NotificationType = 'success';
    commonUtils.notify(title, message, type);
    expect(Store.addNotification).toHaveBeenCalled();
  });
});
