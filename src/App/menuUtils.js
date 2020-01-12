const continueMenuItem = (menu, index, location, auth, view) => {
  if (menu.type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) return view.googleButtons('login', index);
  if (menu.type === 'googleLogout' && auth.isAuthenticated) return view.googleButtons('logout', index);
  return null;
};

const menuItem = (menu, index, view) => {
  const { location, auth } = view.props;
  if (location.pathname === '/staff' && menu.link === '/staff') return null;
  if (menu.link === '/staff' && auth.isAuthenticated) return null;
  if (menu.link === '/belief' && auth.isAuthenticated) return null;
  if (menu.name === 'Staff Dashboard' && !auth.isAuthenticated) return null;
  if (menu.link === '') return continueMenuItem(menu, index, location, auth, view);
  return view.makeMenuLink(menu, index);
};

export default { continueMenuItem, menuItem };
