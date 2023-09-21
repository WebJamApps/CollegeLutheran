import renderer from 'react-test-renderer';
import {
  EditNewsDialog, NewsTextField, EditNewsContent, EditNewsButtons,
} from 'src/containers/News/EditNewsDialog';
import utils, { defaultNews } from 'src/containers/News/utilsN';

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
  it('renders EditNewsContent and handles events', () => {
    const props = {
      showHideCaption: jest.fn(),
      editNewsState: { editNews: defaultNews, setEditNews: jest.fn() },
    };
    const evt = { target: { value: 'url' } };
    const result = renderer.create(<EditNewsContent {...props} />).root;
    expect(result.findByProps({ label: '* URL' }).props.onChange(evt)).toBe('url');
    expect(result.findByProps({ label: '* Title' }).props.onChange(evt)).toBe('url');
  });
  it('renders EditNewsButtons and handles events', () => {
    utils.updateNews = jest.fn();
    utils.deleteNews = jest.fn();
    const props = {
      editNews: defaultNews,
      setEditNews: jest.fn(),
    };
    const result = renderer.create(<EditNewsButtons {...props} />).root;
    result.findByProps({ className: 'updateNewsButton' }).props.onClick();
    expect(utils.updateNews).toHaveBeenCalled();
    result.findByProps({ className: 'deleteNewsButton' }).props.onClick();
    expect(utils.deleteNews).toHaveBeenCalled();
    result.findByProps({ className: 'cancelNewsButton' }).props.onClick();
    expect(props.setEditNews).toHaveBeenCalled();
  });
});
