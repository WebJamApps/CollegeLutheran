import { EditPicDialog } from 'src/containers/AdminDashboard/EditPicDialog';
import renderer from 'react-test-renderer';
import { defaultPic } from 'src/containers/AdminDashboard/utils';

describe('EditPicDialog', () => {
  it('renders EditPicDialog', () => {
    const props = {
      onClose: jest.fn(), editPic: defaultPic, setEditPic: jest.fn(),
    };
    const epd = renderer.create(<EditPicDialog {...props} />).toJSON();
    expect(epd).toMatchSnapshot();
  });
});
