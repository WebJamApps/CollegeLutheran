/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AdminDashboard } from 'src/containers/AdminDashboard';

describe('Dashboard Container', () => {
  it('is true', () => {
    expect(true).toBe(true);
  });
  it('renders AdminDashboard', () => {
    const ad = renderer.create(<BrowserRouter><AdminDashboard /></BrowserRouter>).toJSON();
    expect(ad).toMatchSnapshot();
  });
});
