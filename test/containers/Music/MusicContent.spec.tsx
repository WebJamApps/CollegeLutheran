import { render } from '@testing-library/react';
import MusicContent from 'src/containers/Music/MusicContent';

describe('MusicContent', () => {
  it('renders the music page', () => {
    const result: any = render(<MusicContent />).container;
    expect(result).toMatchSnapshot();
  });
});
