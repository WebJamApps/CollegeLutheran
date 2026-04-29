import { PicTextField, CreatePicDialog } from 'src/containers/AdminDashboard/CreatePicDialog';
import renderer from 'react-test-renderer';
import utils from 'src/containers/AdminDashboard/utils';

describe('CreatePicDialog', () => {
  it('renders CreatePicDialog', () => {
    const cpd = renderer.create(
      <CreatePicDialog showEditor="createPic" onClose={vi.fn()} />,
    ).toJSON();
    expect(cpd).toMatchSnapshot();
  });
  it('handles onChange for PicTextField', () => {
    const props = {
      label: '',
      url: true,
      title: true,
      setPic: vi.fn(),
      pic: {
        title: '', type: '', url: '', comments: '', _id: '',
      },
    };
    const value = 'title';
    const evt = { target: { value } };
    const result: any = renderer.create(<PicTextField {...props} />).root;
    const tree = result.findByProps({ type: 'text' }).props.onChange(evt);
    expect(tree).toBe(value);
  });
  it('handles onClick for CreatePicDialog', () => {
    const props = { showEditor: 'string', onClose: vi.fn() };
    utils.createPicAPI = vi.fn();
    const result = renderer.create(<CreatePicDialog {...props} />).root;
    result.findByProps({ className: 'createPicButton' }).props.onClick();
    expect(utils.createPicAPI).toHaveBeenCalled();
  });
});

