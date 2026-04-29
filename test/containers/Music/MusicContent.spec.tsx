import renderer from 'react-test-renderer';
import MusicContent from 'src/containers/Music/MusicContent';

describe('MusicContent', () => {
  it('renders the music page', () => {
    const result: any = renderer.create(<MusicContent />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
