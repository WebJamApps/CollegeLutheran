const setTitleAndScroll = (pageTitle: string, width?: number) => {
  if (pageTitle !== '') pageTitle += ' | ';// eslint-disable-line no-param-reassign
  document.title = `${pageTitle}College Lutheran Church`;
  let getClass = 'page-content';
  if (width !== undefined && width < 1004) getClass = 'material-header';
  const top = document.getElementsByClassName(getClass)[0];
  if (top !== undefined && typeof top.scrollIntoView === 'function') top.scrollIntoView();
};
const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

const randomizePics = async (view, w) => {
  if (w >= 900) await delay(4000);
  if (w < 900) await delay(3000);
  const { familyPics, youthPics, otherPics } = view.props;
  let arr = familyPics.concat(youthPics);
  arr = arr.concat(otherPics);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];// eslint-disable-line security/detect-object-injection
  }
  view.setState({ picsState: arr });
};

function getUserRoles(): any[] {
  let userRoles: any[] = [];
  try {
    userRoles = JSON.parse(process.env.userRoles || /* istanbul ignore next */'').roles;
  } catch (e) { /* istanbul ignore next */userRoles = []; }
  return userRoles;
}

export default {
  getUserRoles, setTitleAndScroll, randomizePics, delay,
};
