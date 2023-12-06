import renderer from 'react-test-renderer';
import { EditPicTable } from 'src/containers/AdminDashboard/EditPicTable';

describe('EditPicTable', () => {
  it('renders EditPicTable', () => {
    const ept = renderer.create(<EditPicTable onClose={jest.fn()} />).toJSON();
    expect(ept).toMatchSnapshot();
  });
});
