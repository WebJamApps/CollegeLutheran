import renderer from 'react-test-renderer';
import BeliefsContent from 'src/containers/Beliefs/BeliefsContent';

describe('BeliefsContent', () => {
  it('renders the beliefs page', () => {
    const result: any = renderer.create(<BeliefsContent />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
