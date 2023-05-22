import { CreatePicDialog, PicTextField, makeShowHideCaption } from 'src/containers/AdminDashboard/CreatePicDialog';
import renderer from 'react-test-renderer';
import utils from 'src/containers/AdminDashboard/utils';

describe('CreatePicDialog', () => {
  it('renders PicTextField', () => {
    const props = {
      label: '',
      url: true,
      title: true,
      setPic: jest.fn(),
      pic: {
        title: '', type: '', url: '', comments: '',
      },
    };
    const result: any = renderer.create(<PicTextField {...props} />).toJSON();
    console.log(result.children[0].children[0].type);
    expect(result.children[0].children[0].type).toBe('input');
  });
  it('handles onChange for PicTextField', () => {
    const props = {
      label: '',
      url: true,
      title: true,
      setPic: jest.fn(),
      pic: {
        title: '', type: '', url: '', comments: '',
      },
    };
    const value = 'title';
    const evt = { target: { value } };
    const result: any = renderer.create(<PicTextField {...props} />).root;
    const tree = result.findByProps({ type: 'text' }).props.onChange(evt);
    expect(tree).toBe(value);
  });
  it('handles event for makeShowHideCaption', () => {
    let checked: any;
    const evt = { target: { checked } };
    const setPic = jest.fn();
    const pic = {
      title: '', type: '', url: '', comments: '',
    };
    const handler = makeShowHideCaption(setPic, pic);
    handler(evt);
    expect(setPic).toHaveBeenCalled();
  });
  // it('handles onClick for createPicAPI', () => {
  //   utils.createPicAPI = jest.fn();
  //   const props = {
  //     showDialog: true, setShowDialog: jest.fn(),
  //   };
  //   const result = renderer.create(<CreatePicDialog {...props} />).root;
  //   result.findByProps({ className: 'createPicButton' }).props.onClick();
  //   expect(utils.createPicAPI).toHaveBeenCalled();
  // });
});

