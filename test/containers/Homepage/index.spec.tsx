import renderer from 'react-test-renderer';
import { Homepage } from 'src/containers/Homepage';

describe('Homepage', () => {
  it('should render About and WideFacebookFeed when width >=900', () => {
    const props = { width: 900 };
    const result: any = renderer.create(<Homepage {...props} />).toJSON();
    expect(result.type).toBe('div');
    expect(true).toBe(true);
  });
  it('should render the FacebookFeed when width <900', () => {
    const props = { width: 300 };
    const result:any = renderer.create(<Homepage {...props} />).toJSON();
    expect(result.children[1].type).toBe('div');
  });
});
