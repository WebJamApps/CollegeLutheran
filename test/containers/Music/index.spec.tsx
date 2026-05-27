import { render } from '@testing-library/react';
import { Music } from 'src/containers/Music/index';

describe('Music', () => {
  it('renders correctly without images', () => {
    const tree = render(<Music />).container;
    expect(tree).toMatchSnapshot();
  });
});
