/* eslint-disable @typescript-eslint/no-explicit-any */
// ;
import renderer from 'react-test-renderer';
import { AdminDashboard } from 'src/containers/AdminDashboard';
import type { Ibook } from 'src/redux/mapStoreToProps';
// import { PhotoTable } from '../../../src/components/PhotoTable';

describe('Dashboard Container', () => {
  it('renders AdminDashboard', () => {
    const props = {
      dispatch: jest.fn(),
      homeContent: {} as Ibook,
      books: [] as Ibook[],
      youthContent: {} as Ibook,
    };
    window.location.href = 'http://localhost:7878';
    const ad = renderer.create(<AdminDashboard {...props} />).toJSON();
    expect(ad).toBeDefined();
  });
});
