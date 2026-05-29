/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import commonUtils, { NotificationType } from '../../src/lib/commonUtils';

describe('commonUtils', () => {
  it('calls scrollIntoView', () => {
    const scrollIntoViewMock = vi.fn();
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
    expect(diff).toBeGreaterThanOrEqual(990);
  });
  it('calls toast.success for success type', () => {
    const spy = vi.spyOn(toast, 'success').mockImplementation(() => 0 as never);
    const type: NotificationType = 'success';
    commonUtils.notify('t', 'm', type);
    expect(spy).toHaveBeenCalled();
  });
});
