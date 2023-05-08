import { ChangeHomepage, CommentsEditor, UpdateButton } from 'src/containers/AdminDashboard/AdminDashboardContent';
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
    // const setTitle = jest.fn();
    const value = 'title';
    const evt = { target: { value } };
    const result = renderer.create(<ChangeHomepage />).root;
    const tree = result.findByProps({ type: 'text' }).props.onChange(evt);
    expect(tree).toBe(value);
  });
});
