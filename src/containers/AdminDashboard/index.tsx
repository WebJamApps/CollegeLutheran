import commonUtils from 'src/lib/commonUtils';
import { useEffect } from 'react';
import { AdminDashboardContent } from './AdminDashboardContent';

export function AdminDashboard(): JSX.Element {
  useEffect(() => commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width), []);
  return (
    <AdminDashboardContent />
  );
}

