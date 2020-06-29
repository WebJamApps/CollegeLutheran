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
      props: { familyPics: [{}, {}], youthPics: [{}], otherPics: [{}] },
      setState: (obj: { picsState: string | any[]; }) => expect(obj.picsState.length).toBe(4),
    };
    await commonUtils.randomizePics(vStub, jest.fn());
  });
});
