function showNav(
  isAllowed: boolean,
  location: { pathname: string; } | undefined,
  m: { link: string; },
  auth: { isAuthenticated: boolean; },
) {
  if (!isAllowed) return false;
  if (location?.pathname === '/staff' && m.link === '/staff') return false;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return false;
  return true;
}

const stripTrailingSlash = (path: string): string => {
  if (path === '/' || !path.endsWith('/')) return path;
  return path.replace(/\/$/, '');
};

export const isCurrentPage = (currentPath: string, link: string): boolean => {
  if (!link) return false;
  return stripTrailingSlash(currentPath) === stripTrailingSlash(link);
};

export default { showNav, isCurrentPage };
