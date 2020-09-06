/* eslint-disable @typescript-eslint/no-explicit-any */
import commonUtils from '../../src/lib/commonUtils';

describe('commonUtils', () => {
  it('calls scrollIntoView', () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    document.body.innerHTML = '<div class="page-content"></div>';
    commonUtils.setTitleAndScroll('home');
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
  it('shuffles the pictures', async () => {
    const vStub = {
      props: {
        familyPics: [{ title: '', type: '' }], youthPics: [{ title: '', type: '' }], otherPics: [{ title: '', type: '' }],
      },
      setState: (obj: { picsState: string | any[]; }) => expect(obj.picsState.length).toBe(3),
    };
    await commonUtils.randomizePics(vStub as any, jest.fn());
  });
  it('Sets arr to a blank', async () => {
    const vStub = {
      props: {
        arr: [],
      },
      setState: (obj: { picsState: string | any[]; }) => expect(obj.picsState.length).toBe(0),
    };
    await commonUtils.randomizePics(vStub as any, jest.fn());
  });
});
