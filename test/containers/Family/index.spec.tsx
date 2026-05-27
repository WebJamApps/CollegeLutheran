/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { Family } from '../../../src/containers/Family/index';

describe('Family', () => {
  it('renders correctly without images', () => {
    const tree = render(<Family />).container;
    expect(tree).toMatchSnapshot();
  });
});
