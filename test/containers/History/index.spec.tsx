import { render } from '@testing-library/react';
import commonUtils from 'src/lib/commonUtils';
import { History } from 'src/containers/History';

describe('History', () => {
  it('calls setTitleAndScroll and renders History container', () => {
    const spy = vi.spyOn(commonUtils, 'setTitleAndScroll');
    const { container } = render(<History />);
    expect(spy).toHaveBeenCalledWith('History', window.screen.width);
    expect(container).toMatchSnapshot();
  });
});
