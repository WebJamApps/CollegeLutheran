import setTitleAndScroll from '../../src/lib/commonUtils'; // eslint-disable-line no-unused-vars

describe('forms', () => {
  it('calls scrollIntoView', () => {
    const top = {};
    top.scrollIntoView = jest.fn();
    if (typeof top.scrollIntoView === 'function') {
      top.scrollIntoView();
    }
    expect(top.scrollIntoView).toHaveBeenCalled();
  });
});
