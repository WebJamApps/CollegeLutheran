export interface MenuItem {
  classname: string,
  type: string,
  iconClass: string,
  link: string,
  name: string,
  auth?: boolean,
}
const menuItems = [{
  classname: 'dashboard',
  type: 'link',
  iconClass: 'fas fa-user-secret',
  link: 'admin',
  name: 'Admin Dashboard',
  auth: true,
},
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
  iconClass: 'fas fa-handshake',
  link: '/giving',
  name: 'Giving',
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
{
  classname: '',
  type: 'link',
  iconClass: 'far fa-newspaper',
  link: '/news',
  name: 'News',
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
export default menuItems;