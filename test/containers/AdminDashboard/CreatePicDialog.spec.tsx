import { PicTextField, CreatePicDialog } from 'src/containers/AdminDashboard/CreatePicDialog';
import renderer from 'react-test-renderer';
import utils from 'src/containers/AdminDashboard/utils';
// import { AuthProvider } from 'src/providers/Auth.provider';
// import { ContentProvider } from 'src/providers/Content.provider';

describe('CreatePicDialog', () => {
  it('renders CreatePicDialog', () => {
    const cpd = renderer.create(
      <CreatePicDialog showEditor="createPic" onClose={jest.fn()} />,
    ).toJSON();
    expect(cpd).toMatchSnapshot();
  });
  // it('renders PicTextField', () => {
  //   const props = {
  //     label: '',
  //     url: true,
  //     title: true,
  //     setPic: jest.fn(),
  //     pic: {
  //       title: '', type: '', url: '', comments: '', _id: '',
  //     },
  //   };
  //   const result: any = renderer.create(<PicTextField {...props} />).toJSON();
  //   expect(result.children[0].children[0].type).toBe('input');
  // });
  it('handles onChange for PicTextField', () => {
    const props = {
      label: '',
      url: true,
      title: true,
      setPic: jest.fn(),
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
    const props = { showEditor: 'string', onClose: jest.fn() };
    utils.createPicAPI = jest.fn();
    const result = renderer.create(<CreatePicDialog {...props} />).root;
    result.findByProps({ className: 'createPicButton' }).props.onClick();
    expect(utils.createPicAPI).toHaveBeenCalled();
  });
});

