const continueMenuItem = (menu, index, location, auth, controller) => {
  if (menu.type === 'googleLogin' && !auth.isAuthenticated) return controller.googleButtons('login', index);
  if (menu.type === 'googleLogout' && auth.isAuthenticated) return controller.googleButtons('logout', index);
  return null;
};

const menuItem = (menu, index, controller) => {
  const { location, auth } = controller.props;
  if (location.pathname.includes('/') && (menu.link === '/belief' || menu.link === '/staff'
  || menu.link === '/music')) {
    return controller.makeMenuLink(menu, index);
  }
  if (location.pathname.includes('') && (menu.link === '/giving' || menu.link === '/youth' || menu.link === '/family')) {
    return controller.makeMenuLink(menu, index);
  }
  if (location.pathname.includes('') && (menu.link === '/news' || menu.link === '/')) {
    return controller.makeMenuLink(menu, index);
  }
  return continueMenuItem(menu, index, location, auth, controller);
};

export default { continueMenuItem, menuItem };
