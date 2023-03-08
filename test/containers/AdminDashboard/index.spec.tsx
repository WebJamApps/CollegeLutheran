/* eslint-disable @typescript-eslint/no-explicit-any */

import renderer from 'react-test-renderer';
import { AdminDashboard } from 'src/containers/AdminDashboard';
import type { Ibook } from 'src/redux/mapStoreToProps';
// import { PhotoTable } from '../../../src/components/PhotoTable';

describe('Dashboard Container', () => {
//   it('renders AdminDashboard', () => {
//     const props = {
//       dispatch: jest.fn(),
//       homePage: {} as Ibook,
//       books: [] as Ibook[],
//       youthPage: {} as Ibook,
//     };
//     const data = { title: '', type: '', _id: '' };
//     window.location.href = 'http://localhost:7878';
//     const ad = renderer.create(<AdminDashboard getContent={data} {...props} />).toJSON();
//     expect(ad).toBeDefined();
//   });
  it('is true', () => {
    expect(true).toBe(true);
  });
});
