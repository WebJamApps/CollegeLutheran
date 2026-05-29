import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import StaffContent, { MoreStaff } from 'src/containers/Staff/StaffContent';

describe('Staff', () => {
  it('renders MoreStaff', () => {
    const result: any = render(<MoreStaff />).container;
    expect(result).toMatchSnapshot();
  });
  it('renders StaffContent', () => {
    const result: any = render(<MemoryRouter><StaffContent /></MemoryRouter>).container;
    expect(result).toMatchSnapshot();
  });
});
