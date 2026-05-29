import { render } from '@testing-library/react';
import { Giving } from '../../src/containers/Giving/index';

describe('Giving', () => {
  it('Renders the Giving component', () => {
    const giving = render(<Giving />).container;
    expect(giving).toMatchSnapshot();
  });
});
