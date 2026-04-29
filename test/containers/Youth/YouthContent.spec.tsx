import renderer from 'react-test-renderer';
import { YouthContent } from 'src/containers/Youth/YouthContent';

describe('YouthContent', () => {
  it('renders the youth page', () => {
    const result: any = renderer.create(<YouthContent />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
