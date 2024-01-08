import { EditPicDialog } from 'src/containers/AdminDashboard/EditPic/EditPicDialog';
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
  it('handles events for EditPicDialog for url field', () => {
    const props = {
      onClose: jest.fn(), editPic: defaultPic, setEditPic: jest.fn(),
    };
    const evt = { target: { value: 'url' } };
    const result = renderer.create(<EditPicDialog {...props} />).root;
    expect(result.findByProps({ label: '* URL' }).props.onChange(evt)).toBe('url');
  });
  it('handles events for EditPicDialog for title field', () => {
    const props = {
      onClose: jest.fn(), editPic: defaultPic, setEditPic: jest.fn(),
    };
    const evt = { target: { value: 'title' } };
    const result = renderer.create(<EditPicDialog {...props} />).root;
    expect(result.findByProps({ label: '* Title' }).props.onChange(evt)).toBe('title');
  });
  it('handles onClose for EditPicDialog', () => {
    const props = {
      editPic: defaultPic, onClose: jest.fn(), setEditPic: jest.fn(),
    };
    const result = renderer.create(<EditPicDialog {...props} />).root;
    result.findByProps({ className: 'editPicDialog' }).props.onClose();
    expect(props.setEditPic).toHaveBeenCalled();
  });
  // it('handles onClick for EditPicDialog', () => {
  //   picUtils.updatePic = jest.fn();
  //   picUtils.deletePic = jest.fn();
  //   const props = {
  //     editPic: defaultPic, onClose: jest.fn(), setEditPic: jest.fn(),
  //   };
  //   const result = renderer.create(<EditPicDialog {...props} />).root;
  //   result.findByProps({ className: 'updatePicButton' }).props.onClick();
  //   expect(picUtils.updatePic).toHaveBeenCalled();
  // });
});
