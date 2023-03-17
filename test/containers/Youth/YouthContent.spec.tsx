import renderer from 'react-test-renderer';
import { YouthContent } from 'src/containers/Youth/YouthContent';

describe('YouthContent', () => {
  it('renders the youth page', () => {
    const props = { youthPage: { title: '', _id: '', type: '' } };
    const result: any = renderer.create(<YouthContent {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
