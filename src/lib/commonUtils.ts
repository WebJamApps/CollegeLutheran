const setTitleAndScroll = (pageTitle: string, width?: number) => {
  if (pageTitle !== '') pageTitle += ' | ';// eslint-disable-line no-param-reassign
  document.title = `${pageTitle}College Lutheran Church`;
  let getClass = 'page-content';
  if (width !== undefined && width < 1004) getClass = 'material-header';
  const top = document.getElementsByClassName(getClass)[0];
  if (top !== undefined && typeof top.scrollIntoView === 'function') top.scrollIntoView();
};

async function randomizePics(view: { props: { familyPics: any; youthPics: any; otherPics: any; };
  setState: (arg0: { picsState: any; }) => void; },
delay:any) {
  await delay();
  const { familyPics, youthPics, otherPics } = view.props;
  let arr = familyPics.concat(youthPics);
  arr = arr.concat(otherPics);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];// eslint-disable-line security/detect-object-injection
  }
  view.setState({ picsState: arr });
}

function getUserRoles(): any[] {
  let userRoles: string[] = [];
  try {
    userRoles = JSON.parse(process.env.userRoles || /* istanbul ignore next */'').roles;
  } catch (e) { /* istanbul ignore next */userRoles = []; }
  return userRoles;
}

export default {
  getUserRoles, setTitleAndScroll, randomizePics,
};
