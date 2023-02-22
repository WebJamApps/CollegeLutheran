// import { MenuItem } from './MenuItem';
// import { menuItems } from './menuItems';

// interface CurrentStyles {
//   headerClass: string,
//   sidebarClass: string,
//   sidebarImagePath: string
// }

// // export function handleKeyPress(evt: { key: string; }, setMenuOpen:(arg0:boolean) => void): (void | null) {
// //   if (evt.key === 'Escape') return setMenuOpen(false);
// //   return null;
// // }

// function NavLinks({
//   location, auth, books, setMenuOpen, dispatch,
// }:any): JSX.Element {
//   return (
//     <div className="nav-list" style={{ width: '220px' }}>
//       <p style={{ fontSize: '1px', marginBottom: '2px' }} />
//       <div className="menu-item" style={{ backgroundColor: '#244a8bff' }}>
//         <p style={{ color: '#fff', marginBottom: '2px', fontSize: '11pt' }}>
//           <a href="http://bit.ly/CollegeLutheranDirections" className="menu-hover" style={{ color: '#88c1ff' }}>
//             <span>210 S. College Ave</span>
//           </a>
//           <br />
//           Salem, VA 24153
//         </p>
//       </div>
//       <div className="menu-item" style={{ backgroundColor: '#244a8bff' }}>
//         <p style={{ color: '#fff', marginBottom: '2px', fontSize: '11pt' }}>
//           <span>ph: </span>
//           <a href="tel:5403894963" className="menu-hover" style={{ color: '#88c1ff' }}>(540) 389-4963</a>
//           <br />
//           <span>fax: </span>
//           (540) 389-4980
//           <br />
//           <a style={{ color: '#88c1ff', wordWrap: 'break-word' }} href="mailto:office1@collegelutheran.org">
//             <span className="menu-hover">office1@collegelutheran.org</span>
//           </a>
//         </p>
//       </div>
//       {menuItems.map(
//         (menu, index) => (
//           <MenuItem
//             key={index}
//             menu={menu}
//             index={index}
//             location={location}
//             auth={auth}
//             books={books}
//             setMenuOpen={setMenuOpen}
//             dispatch={dispatch}
//           />
//         ),
//       )}
//     </div>
//   );
// }

// const currentStyles = ():CurrentStyles => { // eslint-disable-line class-methods-use-this
//   const result = {
//     headerClass: 'home-header',
//     sidebarClass: 'home-sidebar',
//     sidebarImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Lutherrose.svg/800px-Lutherrose.svg.png',
//   };
//   return result;
// };

// interface IdrawerContainerProps {
//   handleKeyPress: (arg0:any)=>void, className:any, userCount?:number,
//   heartBeat?:string, handleClose:()=>void
// }

// export const DrawerContainer = (props:IdrawerContainerProps) => {
//   const {
//     userCount, heartBeat, className, handleClose, handleKeyPress,
//   } = props;
//   return (
//     <div tabIndex={0} role="button" id="sidebar" onClick={handleClose} onKeyPress={handleKeyPress} className={className}>
//       <div className="drawer" style={{ backgroundColor: '#c0c0c0', zIndex: -1, position: 'relative' }}>
//         <div className="navImage" style={{ width: '220px' }}>
//           <img
//             alt="Luther Rose"
//             id="webjamwidelogo"
//             src={`${currentStyles().sidebarImagePath}`}
//             style={{ width: '86px', marginRight: 0, marginLeft: 0 }}
//           />
//         </div>
//         <NavLinks handleClose={handleClose} />
//       </div>
//     </div>
//   );
// };

import { NavLinks } from './NavLinks';

interface IdrawerContainerProps {
  handleKeyPress: (arg0:any)=>void, className:any, userCount?:number,
  heartBeat?:string, handleClose:()=>void
}
export function DrawerContainer(props:IdrawerContainerProps) {
  const {
    userCount, heartBeat, className, handleClose, handleKeyPress,
  } = props;
  return (
    <div tabIndex={0} role="button" id="sidebar" onClick={handleClose} onKeyPress={handleKeyPress} className={className}>
      <div className="drawer" style={{ backgroundColor: '#c0c0c0', zIndex: -1, position: 'relative' }}>
        <div className="navImage">
          <img
            alt="Luther Rose"
            id="webjamwidelogo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Lutherrose.svg/800px-Lutherrose.svg.png"
            style={{ width: '86px', marginRight: 0, marginLeft: 0 }}
          />
        </div>
        <NavLinks
          handleClose={handleClose}
          // userCount={userCount}
          // heartBeat={heartBeat}
        />
      </div>
    </div>
  );
}
