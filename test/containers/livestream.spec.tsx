import { LiveStream } from 'src/containers/LiveStream/index';
import { render } from '@testing-library/react';

describe('LiveStream', () => {
  it('renders widescreen', () => {
    const liveStream = render(<LiveStream width={950} />).container;
    expect(liveStream).toMatchSnapshot();
  });
  it('renders smallscreen', () => {
    const liveStream = render(<LiveStream width={400} />).container;
    expect(liveStream).toMatchSnapshot();
  });
});
