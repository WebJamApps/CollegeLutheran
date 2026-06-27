import { menuItems } from './menuConfig';
import { SideMenuItem } from './SideMenuItem';
import { useTheme } from '@mui/material/styles';

declare const __APP_VERSION__: string;

interface InavLinksProps {
  handleClose: () => void, userCount?: number, heartBeat?: string,
}
export function NavLinks(props: InavLinksProps) {
  const {
    handleClose,
  } = props;
  const theme = useTheme();
  const contactPanelStyle = {
    backgroundColor: theme.palette.primary.main,
    marginLeft: '0px',
  };
  const contactTextStyle = {
    color: theme.palette.primary.contrastText,
    marginBottom: '2px',
    fontSize: '11pt',
  };
  const contactLinkStyle = {
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : '#88c1ff',
  };
  return (
    <div className="nav-list" style={{ width: '220px' }}>
      <p style={{ fontSize: '1px', marginBottom: '2px' }} />
      <div className="menu-item" style={contactPanelStyle}>
        <p style={contactTextStyle}>
          <a href="http://bit.ly/CollegeLutheranDirections" className="menu-hover" style={contactLinkStyle}>
            <span>210 S. College Ave</span>
          </a>
          <br />
          Salem, VA 24153
        </p>
      </div>
      <div className="menu-item" style={contactPanelStyle}>
        <p style={contactTextStyle}>
          <span>ph: </span>
          <a href="tel:5403894963" className="menu-hover" style={contactLinkStyle}>(540) 389-4963</a>
          <br />
          <span>fax: </span>
          (540) 389-4980
          <br />
          <a style={{ ...contactLinkStyle, wordWrap: 'break-word' }} href="mailto:office1@collegelutheran.org">
            <span className="menu-hover">office1@collegelutheran.org</span>
          </a>
        </p>
      </div>
      {menuItems.map(
        (menu, index) => (
          <SideMenuItem
            key={index}
            menu={menu}
            index={index}
            handleClose={handleClose}
          />
        ),
      )}
      <div style={{
        textAlign: 'left',
        padding: '10px 15px',
        fontSize: '0.8rem',
        color: 'inherit',
        opacity: 0.8,
        marginTop: '0px',
      }}
      ><strong>
          Version
          {' '}
          {__APP_VERSION__}
        </strong>
      </div>
      <p style={{ margin: 0, padding: 0, fontSize: '6pt' }}>&nbsp;</p>
    </div>
  );
}
