import Calendar from 'src/containers/Calendar';
import { render } from '@testing-library/react';

describe('Calendar', () => {
  it('renders correctly', () => {
    const c = render(<Calendar />).container;
    expect(c).toMatchSnapshot();
  });
});
