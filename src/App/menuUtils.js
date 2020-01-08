const continueMenuItem = (menu, index, location, auth, view) => {
  if (menu.type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) return view.googleButtons('login', index);
  if (menu.type === 'googleLogout' && auth.isAuthenticated) return view.googleButtons('logout', index);
  return null;
};

const menuItem = (menu, index, view) => {
  const { location, auth } = view.props;
  if (location.pathname.includes('/staff') && menu.link === '/staff') return null;
  if (menu.link === '') return continueMenuItem(menu, index, location, auth, view);
  return view.makeMenuLink(menu, index);
};

export default { continueMenuItem, menuItem };
