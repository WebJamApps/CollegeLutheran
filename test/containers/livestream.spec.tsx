import { LiveStream } from 'src/containers/LiveStream/index';
import renderer from 'react-test-renderer';

describe('LiveStream', () => {
  it('renders widescreen', () => {
    const liveStream = renderer.create(<LiveStream width={950} />).toJSON();
    expect(liveStream).toMatchSnapshot();
  });
  it('renders smallscreen', () => {
    const liveStream = renderer.create(<LiveStream width={400} />).toJSON();
    expect(liveStream).toMatchSnapshot();
  });
});
