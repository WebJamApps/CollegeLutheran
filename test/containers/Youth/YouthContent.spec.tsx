import renderer from 'react-test-renderer';
import { YouthContent } from 'src/containers/Youth/YouthContent';

describe('YouthContent', () => {
  // it('renders title and comments from youthPage', () => {
  //   const data = {
  //     title: 'title', type: 'youth', _id: 'any', comments: 'comments',
  //   };
  //   const result: any = renderer.create(<YouthContent
  //     youthPics={[]}
  //     data={data}
  //   />).toJSON();
  // expect(result.children[1].children[1].children[6]).toBe('');
  // expect(result.children[1].children[1].children[7].children[0]).toBe('comments');
  //   console.log(result.children[1].children[1].children[6]);
  // });
  // it('renders PicSlider', () => {
  //   const data = { title: '', _id: '', type: '' };
  //   const result: any = renderer.create(<YouthContent youthPics={[]} {...data} />).toJSON();
  //   console.log(result.children[0].props);
  //   expect(result.children[0].props.id).toBe('youthSlideshowWide');
  // });
  it('renders YouthContent', () => {
    const result = renderer.create(<YouthContent />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
