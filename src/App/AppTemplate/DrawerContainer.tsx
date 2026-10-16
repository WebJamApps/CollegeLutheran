import { NavLinks } from './NavLinks';
import './index.scss';

interface IdrawerContainerProps {
  handleKeyPress: (arg0:any)=>void, className:any, userCount?:number,
  heartBeat?:string, handleClose:()=>void, menuOpen?: boolean,
}
export function DrawerContainer(props:IdrawerContainerProps) {
  const {
    className, handleClose, handleKeyPress, menuOpen,
  } = props;
  // Click-to-close catch-all around the drawer. It must NOT be a focusable
  // button: the nav links inside are the interactive elements (each closes the
  // menu itself), and a role="button" wrapper with focusable children violates
  // axe's nested-interactive rule (CollegeLutheran#773).
  return (
    <div
      role="presentation"
      id="sidebar"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onKeyPress={handleKeyPress}
      className={className}
    >
      <div className="drawer">
        <div className="navImage">
          <img
            alt="Luther Rose"
            id="webjamwidelogo"
            src="/Lutherrose.svg"
            style={{ width: '86px', marginRight: 0, marginLeft: 0 }}
          />
        </div>
        <NavLinks
          handleClose={handleClose}
          menuOpen={menuOpen}
        />
      </div>
    </div>
  );
}
