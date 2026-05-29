/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AdminDashboard } from 'src/containers/AdminDashboard';

describe('Dashboard Container', () => {
  it('is true', () => {
    expect(true).toBe(true);
  });
  it('renders AdminDashboard', () => {
    const ad = render(<BrowserRouter><AdminDashboard /></BrowserRouter>).container;
    expect(ad).toMatchSnapshot();
  });
});
