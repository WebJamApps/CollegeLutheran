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
  const { familyPics } = view.props;
  for (let i = familyPics.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = familyPics[i];// eslint-disable-line security/detect-object-injection
    familyPics[i] = familyPics[j];// eslint-disable-line security/detect-object-injection
    familyPics[j] = temp;// eslint-disable-line security/detect-object-injection
  }
  view.setState({ picsState: familyPics });
};

export default { setTitleAndScroll, randomizePics, delay };
