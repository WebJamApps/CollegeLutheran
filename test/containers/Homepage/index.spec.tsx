/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { Homepage } from 'src/containers/Homepage';

describe('Homepage', () => {
  it('should render About and WideFacebookFeed when width >=900', () => {
    const props = { width: 900 };
    const { container } = render(<Homepage {...props} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
  it('should render the FacebookFeed when width <900', () => {
    const props = { width: 300 };
    const { container } = render(<Homepage {...props} />);
    const root = container.firstChild as HTMLElement | null;
    expect(root?.children[1]?.nodeName).toBe('DIV');
  });
});
