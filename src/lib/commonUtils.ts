import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const setTitleAndScroll = (pageTitle: string, width?: number): void => {
  if (pageTitle !== '') pageTitle += ' | ';// eslint-disable-line no-param-reassign
  document.title = `${pageTitle}College Lutheran Church`;
  let getClass = 'page-content';
  if (width !== undefined && width < 1004) getClass = 'material-header';
  const top = document.getElementsByClassName(getClass)[0];
  if (top !== undefined && typeof top.scrollIntoView === 'function') top.scrollIntoView();
};

function getUserRoles(): string[] {
  let userRoles: string[] = [];
  try {
    userRoles = JSON.parse(process.env.userRoles || /* istanbul ignore next */'').roles;
  } catch (e) { /* istanbul ignore next */userRoles = []; }
  return userRoles;
}

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export type NotificationType = 'success' | 'danger' | 'info' | 'default' | 'warning';
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
      duration: 1500,
      onScreen: true,
    },
  });
}

function makeShowHideChecked<Type>(setter: (arg0: Type) => void,
  obj: Type, comment: string) {
  return (evt: any) => {
    const { target: { checked } } = evt;
    const comments = checked ? comment : '';
    setter({ ...obj, comments });
  };
}

export default {
  getUserRoles, setTitleAndScroll, delay, notify, makeShowHideChecked,
};
