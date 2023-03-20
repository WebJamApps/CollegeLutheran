import renderer from 'react-test-renderer';
import MusicContent from 'src/containers/Music/MusicContent';

describe('YouthContent', () => {
  it('renders the music page', () => {
    const props = { title: '', _id: '', type: '' };
    const result: any = renderer.create(<MusicContent {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
