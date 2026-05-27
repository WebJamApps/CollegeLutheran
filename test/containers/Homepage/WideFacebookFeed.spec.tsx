import WideFacebookFeed from 'src/containers/Homepage/WideFacebookFeed';
import { render } from '@testing-library/react';

describe('WideFacebookFeed', () => {
  it('renders WideFacebookFeed', () => {
    const width = 90;
    const result = render(<WideFacebookFeed width={width} />).container;
    expect(result).toMatchSnapshot();
  });
});
