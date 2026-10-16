import { NavLinks } from './NavLinks';
import './index.scss';
import { useTheme } from '@mui/material/styles';

interface IdrawerContainerProps {
  handleKeyPress: (arg0:any)=>void, className:any, userCount?:number,
  heartBeat?:string, handleClose:()=>void, menuOpen?: boolean,
}
export function DrawerContainer(props:IdrawerContainerProps) {
  const {
    className, handleClose, handleKeyPress, menuOpen,
  } = props;
  const theme = useTheme();
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
      <div className="drawer" style={{ backgroundColor: theme.palette.background.paper, zIndex: -1, position: 'relative' }}>
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
