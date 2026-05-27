import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Staff } from 'src/containers/Staff';

describe('Staff', () => {
  it('renders correctly', () => {
    const tree = render(<BrowserRouter><Staff /></BrowserRouter>).container;
    expect(tree).toMatchSnapshot();
  });
});
