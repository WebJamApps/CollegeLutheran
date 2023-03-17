import renderer from 'react-test-renderer';
import StaffContent, { MoreStaff } from 'src/containers/Staff/StaffContent';

describe('Staff', () => {
  it('renders MoreStaff', () => {
    const result: any = renderer.create(<MoreStaff />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('renders StaffContent', () => {
    const result: any = renderer.create(<StaffContent />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
