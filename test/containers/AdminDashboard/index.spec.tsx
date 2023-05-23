/* eslint-disable @typescript-eslint/no-explicit-any */

import renderer from 'react-test-renderer';
import { AdminDashboard } from 'src/containers/AdminDashboard';

describe('Dashboard Container', () => {
  it('renders AdminDashboard', () => {
    window.location.href = 'http://localhost:7878';
    const ad:any = renderer.create(<AdminDashboard />).toJSON();
    expect(ad.props.className).toBe('page-content');
  });
});
