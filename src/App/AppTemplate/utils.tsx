function showNav(isAllowed: boolean, location: { pathname: string; }, m: { link: string; }, auth: { isAuthenticated: boolean; }) {
  if (!isAllowed) return false;
  if (location.pathname === '/staff' && m.link === '/staff') return false;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return false;
  return true;
}

export default { showNav };
