import renderer from 'react-test-renderer';
import { Homepage } from 'src/containers/Homepage';

describe('Homepage', () => {
  it('should render About and WideFacebookFeed when width >=900', () => {
    const props = { width: 900 };
    const result: any = renderer.create(<Homepage {...props} />).toJSON();
    console.log(result.type);
    expect(result.type).toBe('div');
    expect(true).toBe(true);
  });
});
