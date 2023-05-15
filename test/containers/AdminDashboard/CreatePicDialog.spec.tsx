import { CreatePicDialog, PicTextField } from 'src/containers/AdminDashboard/CreatePicDialog';
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
  it('handles onChange', () => {
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
  //   it('handles onClick for createPicAPI', async () => {
  //     utils.createPicAPI = jest.fn();
  //     const showDialog = true;
  //     const setShowDialog = jest.fn();
  //     const result = renderer.create(<CreatePicDialog showDialog={showDialog} setShowDialog={setShowDialog} />).root;
  //     result.findByProps({ className: 'createPicButton' }).props.onClick();
  //     expect(utils.createPicAPI).toHaveBeenCalled();
  //   });
  it('handles event for makeShowHideCaption', () => {
    let checked: any;
    const evt = { target: { checked } };
    const pic = {
      title: '', type: '', url: '', comments: '',
    };
  });
});

