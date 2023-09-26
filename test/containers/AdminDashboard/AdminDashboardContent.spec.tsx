import {
  ChangeHomePageSect, ChangeNewsPage, ChangeYouthPageSect, CommentsEditor, UpdateButton, makeHandleChange,
} from 'src/containers/AdminDashboard/AdminDashboardContent';
import renderer from 'react-test-renderer';
import utils from 'src/containers/AdminDashboard/utils';

describe('AdminDashboard Content', () => {
  it('renders the update button', () => {
    utils.putAPI = jest.fn();
    const props = {
      title: '', comments: 'comments', buttonName: '', type: 'habitatPageContent' as any, getContent: jest.fn(),
    };
    const result = renderer.create(<UpdateButton {...props} />).root;
    result.findByProps({ id: 'c-h' }).props.onClick();
    expect(utils.putAPI).toHaveBeenCalled();
  });
  it('handles setComments on CommentsEditor', () => {
    const setComments = jest.fn();
    const comments = 'test';
    const result = renderer.create(<CommentsEditor setComments={setComments} comments={comments} />).root;
    result.findByProps({ value: 'test' }).props.onEditorChange('newComments');
    expect(setComments).toHaveBeenCalledWith('newComments');
  });
  it('handles setTitle for ChangeHomepage', () => {
    const value = 'title';
    const evt = { target: { value } };
    const result = renderer.create(<ChangeHomePageSect />).root;
    const tree = result.findByProps({ type: 'text' }).props.onChange(evt);
    expect(tree).toBe(value);
  });
  it('handles setTitle for ChangeNewsPage', () => {
    const value = 'somethin';
    const evt = { target: { value } };
    const result = renderer.create(<ChangeNewsPage />).root;
    result.findByProps({ label: 'Title' }).props.onChange(evt);
    const tree = evt.target.value;
    expect(tree).toBe(value);
  });
  it('handles setUrl for ChangeNewsPage', () => {
    const value = 'anythin';
    const evt = { target: { value } };
    const result = renderer.create(<ChangeNewsPage />).root;
    result.findByProps({ label: 'Url' }).props.onChange(evt);
    const tree = evt.target.value;
    expect(tree).toBe(value);
  });
  it('makeHandleChange when checked is true', () => {
    const checked = true;
    const evt = { target: { checked } };
    const setComments = jest.fn();
    const handleChange = makeHandleChange(setComments);
    handleChange(evt);
    expect(setComments).toHaveBeenCalledWith('worshipbulletin');
  });
  it('makeHandleChange when checked is false', () => {
    const checked = false;
    const evt = { target: { checked } };
    const setComments = jest.fn();
    const handleChange = makeHandleChange(setComments);
    handleChange(evt);
    expect(setComments).toHaveBeenCalledWith('');
  });
  it('handles onClick for addNewsAPI button', () => {
    utils.addNewsAPI = jest.fn();
    const result = renderer.create(<ChangeNewsPage />).root;
    result.findByProps({ variant: 'contained' }).props.onClick();
    expect(utils.addNewsAPI).toHaveBeenCalled();
  });
  it('handles onChange for ChangeyouthPage', () => {
    const value = 'title';
    const evt = { target: { value } };
    const result = renderer.create(<ChangeYouthPageSect />).root;
    const tree = result.findByProps({ type: 'text' }).props.onChange(evt);
    expect(tree).toBe(value);
  });
});
