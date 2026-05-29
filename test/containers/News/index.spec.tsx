import { News } from 'src/containers/News/index';
import { render } from '@testing-library/react';

describe('News', () => {
  it('renders correctly', () => {
    const { container } = render(<News />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
