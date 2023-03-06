import renderer from 'react-test-renderer';
import { YouthContent } from 'src/containers/Youth/YouthContent';

describe('YouthContent', () => {
  it('renders title and comments from youthContent', () => {
    const result: any = renderer.create(<YouthContent
      youthContent={{
        title: 'title', _id: 'any', type: 'youth', comments: 'comments',
      }}
      youthPics={[]}
    />).toJSON();
    expect(result.children[1].children[1].children[6].children[0]).toBe('title');
    expect(result.children[1].children[1].children[7].children[0]).toBe('comments');
  });
  it('renders PicSlider', () => {
    const data = { title: 'youthpics', _id: 'a', type: 'youth' };
    const youthContent = { type: '', title: '', _id: '' };
    const result: any = renderer.create(<YouthContent youthPics={[]} youthContent={youthContent} {...data} />).toJSON();
    console.log(result);
  });
});
