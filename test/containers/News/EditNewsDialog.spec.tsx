import renderer from 'react-test-renderer';
import { EditNewsDialog, NewsTextField } from 'src/containers/News/EditNewsDialog';
import utils from 'src/containers/News/utilsN';
import { Ibook } from 'src/providers/utils';

describe('EditNewsDialog', () => {
  it('renders NewsTextField', () => {
    const props = {
      value: '', label: '', onChange: jest.fn(), className: '',
    };
    const result: any = renderer.create(<NewsTextField {...props} />).toJSON();
    expect(result.type).toBe('div');
  });
  it('handles onClose for EditNewsDialog', () => {
    const editNews = {
      title: '', type: 'Forum', comments: '', url: '', _id: '',
    };
    const setEditNews = jest.fn();
    const result = renderer.create(<EditNewsDialog editNews={editNews} setEditNews={setEditNews} />).root;
    result.findByProps({ className: 'editNewsDialog' }).props.onClose();
    expect(setEditNews).toHaveBeenCalled();
  });
  it('handles onChange when label is URL', () => {
    const props = {
      editNews: {
        title: '', type: 'Forum', comments: '', url: '', _id: 'a',
      } as Ibook,
      setEditNews: jest.fn(),
    };
    const evt = { target: { value: 'url' } };
    const result = renderer.create(<EditNewsDialog {...props} />).root;
    const component = result.findByProps({ label: '* URL' });
    // const end = component.props.onChange(evt);
    // expect(end).toBe('url');
  });
  // it('handles onChange when label is Title', () => {
  //   const props = {
  //     editNews: {
  //       title: '', type: 'Forum', comments: '', url: '', _id: '',
  //     },
  //     setEditNews: jest.fn(),
  //   };
  //   const evt = { target: { value: 'title' } };
  //   const result = renderer.create(<EditNewsDialog {...props} />).root;
  //   const end = result.findByProps({ className: 'title' }).props.onChange(evt);
  //   expect(end).toBe('title');
  // });
  // it('handles onClick for update button', () => {
  //   utils.updateNews = jest.fn();
  //   const props = {
  //     editNews: {
  //       title: 'title', type: 'Forum', comments: 'wb', url: 'url', _id: '',
  //     },
  //     setEditNews: jest.fn(),
  //   };
  //   const result = renderer.create(<EditNewsDialog {...props} />).root;
  //   result.findByProps({ className: 'updateNewsButton' }).props.onClick();
  //   expect(utils.updateNews).toHaveBeenCalled();
  // });
  // it('handles onClick for delete button', () => {
  //   utils.deleteNews = jest.fn();
  //   const props = {
  //     editNews: {
  //       title: 'title', type: 'Forum', comments: 'wb', url: 'url', _id: '',
  //     },
  //     setEditNews: jest.fn(),
  //   };
  //   const result = renderer.create(<EditNewsDialog {...props} />).root;
  //   result.findByProps({ className: 'deleteNewsButton' }).props.onClick();
  // });
  // it('handles onClick for cancel button', () => {
  //   const props = {
  //     editNews: {
  //       title: 'title', type: 'Forum', comments: 'wb', url: 'url', _id: '',
  //     },
  //     setEditNews: jest.fn(),
  //   };
  //   const result = renderer.create(<EditNewsDialog {...props} />).root;
  //   result.findByProps({ className: 'cancelPicButton' }).props.onClick();
  // });
});
