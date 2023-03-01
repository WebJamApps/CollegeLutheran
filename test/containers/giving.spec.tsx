import renderer from 'react-test-renderer';
import { Giving } from '../../src/containers/Giving/index';

describe('Giving', () => {
  it('Renders the Giving component', () => {
    const giving = renderer.create(<Giving />).toJSON();
    expect(giving).toMatchSnapshot();
  });
});
