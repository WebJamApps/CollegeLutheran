const setTitleAndScroll = (pageTitle, width) => {
  if (pageTitle !== '') pageTitle += ' | ';// eslint-disable-line no-param-reassign
  document.title = `${pageTitle}College Lutheran Church`;
  let getClass = 'page-content';
  if (width !== undefined && width < 1004)getClass = 'material-header';
  const top = document.getElementsByClassName(getClass)[0];
  if (top !== undefined && typeof top.scrollIntoView === 'function') top.scrollIntoView();
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const randomizePics = async (view) => {
  await delay(5000);
  const { familyPics, youthPics, otherPics } = view.props;
  let arr = familyPics.concat(youthPics);
  arr = arr.concat(otherPics);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];// eslint-disable-line security/detect-object-injection
  }
  view.setState({ picsState: arr });
};

export default { setTitleAndScroll, randomizePics, delay };
