import { render } from '@testing-library/react';
import { EditPicTable } from 'src/containers/AdminDashboard/EditPic/EditPicTable';

describe('EditPicTable', () => {
  it('renders EditPicTable', () => {
    const ept = render(<EditPicTable onClose={vi.fn()} />).container;
    expect(ept).toMatchSnapshot();
  });
});
