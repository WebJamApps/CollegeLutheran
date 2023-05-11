/* eslint-disable @typescript-eslint/no-explicit-any */

import renderer from 'react-test-renderer';
import { AdminDashboard } from 'src/containers/AdminDashboard';
import type { Ibook } from 'src/providers/utils';

describe('Dashboard Container', () => {
  it('renders AdminDashboard', () => {
    const props = {
      dispatch: jest.fn(),
      books: [] as Ibook[],
      youthContent: {} as Ibook,
    };
    window.location.href = 'http://localhost:7878';
    const ad = renderer.create(<AdminDashboard {...props} />).toJSON();
    expect(ad).toBeDefined();
  });
  it('is true', () => {
    expect(true).toBe(true);
  });
});
