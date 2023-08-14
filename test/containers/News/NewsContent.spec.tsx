import renderer from 'react-test-renderer';
import NewsContent from 'src/containers/News/NewsContent';

describe('NewsContent', () => {
  it('renders the news page', () => {
    const result: any = renderer.create(<NewsContent />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('renders the news table', () => {
    const props = { title: 'title', type: 'type', _id: 'a' };
    const result: any = renderer.create(<NewsContent books={[props]} />).toJSON();
    expect(result.children[0].children[0].children[0].props.className).toBe('forumsTable');
  });
  it('handles event for NewsContent', () => {
    const props = { title: 'title', type: 'type', _id: 'a' };
    const setEditNews = jest.fn();
    const result = renderer.create(<NewsContent books={[props]} />).root;
    result.findByProps({ className: 'TableRow-root news' }).props.onClick();
    setEditNews();
    expect(setEditNews).toHaveBeenCalled();
  });
});
