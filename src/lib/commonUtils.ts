import type { Ipicture } from 'src/providers/Pics.provider';
import { Store } from 'react-notifications-component';
import type { Homepage } from '../containers/Homepage/index';
import 'react-notifications-component/dist/theme.css';

const setTitleAndScroll = (pageTitle: string, width?: number): void => {
  if (pageTitle !== '') pageTitle += ' | ';// eslint-disable-line no-param-reassign
  document.title = `${pageTitle}College Lutheran Church`;
  let getClass = 'page-content';
  if (width !== undefined && width < 1004) getClass = 'material-header';
  const top = document.getElementsByClassName(getClass)[0];
  if (top !== undefined && typeof top.scrollIntoView === 'function') top.scrollIntoView();
};

async function randomizePics(view: Homepage, delay: () => Promise<void>): Promise<void> {
  await delay();
  const {
    familyPics, youthPics, otherPics, musicPics, habitatPics,
  } = view.props;
  let arr: Ipicture[] | never[] = familyPics || [];
  const arr2: Ipicture[] = youthPics || [];
  const arr3: Ipicture[] = musicPics || [];
  const arr4: Ipicture[] = habitatPics || [];
  arr = arr.concat(otherPics || []).concat(arr2).concat(arr3).concat(arr4);

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];// eslint-disable-line security/detect-object-injection
  }
  view.setState({ picsState: arr });
}

function getUserRoles(): string[] {
  let userRoles: string[] = [];
  try {
    userRoles = JSON.parse(process.env.userRoles || /* istanbul ignore next */'').roles;
  } catch (e) { /* istanbul ignore next */userRoles = []; }
  return userRoles;
}

const delay = (seconds:number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
type NotificationType = 'success' | 'danger' | 'info' | 'default' | 'warning';
function notify(title: string, message: string, type: NotificationType) {
  Store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated animate__fadeIn'],
    animationOut: ['animate__animated animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

export default {
  getUserRoles, setTitleAndScroll, randomizePics, delay, notify,
};
