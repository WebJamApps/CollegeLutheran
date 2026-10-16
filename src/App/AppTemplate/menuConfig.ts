export interface ImenuItem {
  classname: string;
  type: string;
  iconClass: string;
  link: string;
  name: string;
  auth?: boolean;
  nav?: string;
  children?: ImenuItem[];
}

export const menuItems: ImenuItem[] = [
  {
    classname: 'dashboard',
    type: 'link',
    iconClass: 'fas fa-user-secret',
    link: '/admin',
    name: 'Admin Dashboard',
    auth: true,
  },
  {
    classname: 'about-us',
    type: 'group',
    iconClass: 'fas fa-church',
    link: '',
    name: 'About Us',
    children: [
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-arrows-alt',
        link: '/belief',
        name: 'Our Lutheran Beliefs',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-landmark',
        link: '/history',
        name: 'History',
      },
    ],
  },
  {
    classname: 'worship',
    type: 'group',
    iconClass: 'fas fa-bible',
    link: '',
    name: 'Worship',
    children: [
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-bible',
        link: '',
        name: 'Bulletin',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-video',
        link: '/livestream',
        name: 'Livestream',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-handshake',
        link: '/giving',
        name: 'Giving',
      },
    ],
  },
  {
    classname: 'people-ministries',
    type: 'group',
    iconClass: 'fas fa-users',
    link: '',
    name: 'People & Ministries',
    children: [
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-users',
        link: '/staff',
        name: 'Church Staff',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-music',
        link: '/music',
        name: 'Music',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-futbol',
        link: '/youth',
        name: 'Youth Ministry',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-child',
        link: '/family',
        name: 'Children & Families',
      },
    ],
  },
  {
    classname: 'news-events',
    type: 'group',
    iconClass: 'far fa-calendar-alt',
    link: '',
    name: 'News & Events',
    children: [
      {
        classname: '',
        type: 'link',
        iconClass: 'fas fa-step-forward',
        link: '/stewardship',
        name: 'Stewardship',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'far fa-newspaper',
        link: '/news',
        name: 'News',
      },
      {
        classname: '',
        type: 'link',
        iconClass: 'far fa-calendar',
        link: '/calendar',
        name: 'Calendar',
      },
    ],
  },
  {
    classname: 'home',
    type: 'link',
    iconClass: 'fas fa-heart',
    link: '/',
    name: 'Home',
  },
  {
    classname: 'login',
    type: 'googleLogin',
    iconClass: 'fas fa-login',
    link: '',
    name: 'Login',
  },
  {
    classname: 'logout',
    type: 'googleLogout',
    iconClass: 'fas fa-logout',
    link: '',
    name: 'Logout',
    auth: true,
  },
];
