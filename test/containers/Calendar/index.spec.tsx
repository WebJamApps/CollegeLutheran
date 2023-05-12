import Calendar from 'src/containers/Calendar';
import renderer from 'react-test-renderer';

describe('Calendar', () => {
  it('renders correctly', () => {
    const c = renderer.create(<Calendar />).toJSON();
    expect(c).toMatchSnapshot();
  });
});
