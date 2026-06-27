import { NavLinks } from './NavLinks';
import './index.scss';
import { useTheme } from '@mui/material/styles';

interface IdrawerContainerProps {
  handleKeyPress: (arg0:any)=>void, className:any, userCount?:number,
  heartBeat?:string, handleClose:()=>void
}
export function DrawerContainer(props:IdrawerContainerProps) {
  const {
    className, handleClose, handleKeyPress,
  } = props;
  const theme = useTheme();
  return (
    <div tabIndex={0} role="button" id="sidebar" onClick={handleClose} onKeyPress={handleKeyPress} className={className}>
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
        />
      </div>
    </div>
  );
}
