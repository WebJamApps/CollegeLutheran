import commonUtils from '../../src/lib/commonUtils';

describe('commonUtils', () => {
  it('calls scrollIntoView', () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    document.body.innerHTML = '<div class="page-content"></div>';
    commonUtils.setTitleAndScroll('home');
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
  it('shuffles the pictures after 5 seconds', async () => {
    const vStub = { props: { familyPics: [{}, {}], youthPics: [{}], otherPics: [{}] }, setState: (obj) => expect(obj.picsState.length).toBe(4) };
    global.setTimeout = jest.fn((cb) => cb());
    await commonUtils.randomizePics(vStub);
  });
  it('shuffles the pictures after 4 seconds', async () => {
    const vStub = { props: { familyPics: [{}, {}], youthPics: [{}], otherPics: [{}] }, setState: (obj) => expect(obj.picsState.length).toBe(4) };
    const w = 800;
    global.setTimeout = jest.fn((cb) => cb());
    await commonUtils.randomizePics(vStub, w);
  });
});
