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
      props: { familyPics: [{ title: '', type: '' }], youthPics: [{ title: '', type: '' }], otherPics: [{ title: '', type: '' }] },
      setState: (obj: { picsState: string | any[]; }) => expect(obj.picsState.length).toBe(3),
    };
    await commonUtils.randomizePics(vStub, jest.fn());
  });
});
