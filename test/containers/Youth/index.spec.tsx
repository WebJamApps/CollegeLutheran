/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { Youth } from 'src/containers/Youth/index';

describe('Youth', () => {
  it('renders correctly without images', () => {
    const tree = render(<Youth />).container;
    expect(tree).toMatchSnapshot();
  });
});
