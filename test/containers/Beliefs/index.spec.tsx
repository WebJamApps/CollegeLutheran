import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Beliefs } from 'src/containers/Beliefs';

describe('Beliefs', () => {
  it('renders correctly', () => {
    const tree = render(<BrowserRouter><Beliefs /></BrowserRouter>).container;
    expect(tree).toMatchSnapshot();
  });
});
