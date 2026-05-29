/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from '@testing-library/react';
import { NewsContent } from 'src/containers/News/NewsContent';

describe('NewsContent', () => {
  it('renders the news page', () => {
    const { container } = render(<NewsContent />);
    expect(container).toMatchSnapshot();
  });
  it('renders the news table', () => {
    const props = { title: 'title', type: 'type', _id: 'a' };
    const { container } = render(<NewsContent books={[props]} />);
    expect(container.querySelector('.forumsTable')).not.toBeNull();
  });
  it('handles event for NewsContent', () => {
    const props = { title: 'title', type: 'type', _id: 'a' };
    const { container } = render(<NewsContent books={[props]} />);
    const row = container.querySelector('.TableRow-root.news') as HTMLElement | null;
    expect(row).not.toBeNull();
    fireEvent.click(row!);
  });
});
