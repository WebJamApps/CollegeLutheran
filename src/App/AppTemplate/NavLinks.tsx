import { useTheme } from '@mui/material/styles';
import { menuItems } from './menuConfig';
import { SideMenuItem } from './SideMenuItem';
import { ThemeToggle } from './ThemeToggle';

declare const __APP_VERSION__: string;

interface InavLinksProps {
  handleClose: () => void, userCount?: number, heartBeat?: string,
  menuOpen?: boolean,
}
export function NavLinks(props: InavLinksProps) {
  const {
    handleClose, menuOpen,
  } = props;
  const theme = useTheme();
  const contactPanelStyle = {
    backgroundColor: theme.palette.primary.main,
    marginLeft: '0px',
    padding: '8px 12px',
    minHeight: 'unset',
    display: 'block',
  };
  const contactTextStyle = {
    color: theme.palette.primary.contrastText,
    margin: 0,
    fontSize: '10pt',
    lineHeight: 1.4,
  };
  const contactLinkStyle = {
    color: '#88c1ff',
    fontSize: '10pt',
  };
  return (
    <div className="nav-list" style={{ width: '220px' }}>
      <p style={{ fontSize: '1px', marginBottom: '2px' }} />
      <div className="menu-item contact-panel" style={contactPanelStyle}>
        <p style={contactTextStyle}>
          <a
            href="https://www.google.com/maps/place/College+Lutheran+Church,+210+S+College+Ave,+Salem,+VA+24153"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-hover contact-link"
            style={contactLinkStyle}
          >
            <span>210 S. College Ave</span>
          </a>
          <br />
          Salem, VA 24153
          <br />
          <a
            href="tel:5403894963"
            className="menu-hover contact-link"
            style={contactLinkStyle}
          >
            <span>(540) 389-4963</span>
          </a>
          <br />
          <a
            style={{ ...contactLinkStyle, whiteSpace: 'nowrap' }}
            href="mailto:office1@collegelutheran.org"
            className="menu-hover contact-link"
          >
            <span>office1@collegelutheran.org</span>
          </a>
        </p>
      </div>
      {menuItems.map(
        (menu, index) => (
          <SideMenuItem
            key={menu.name || index}
            menu={menu}
            index={index}
            handleClose={handleClose}
            menuOpen={menuOpen}
          />
        ),
      )}
      <ThemeToggle />
      <div style={{
        textAlign: 'left',
        padding: '10px 15px',
        fontSize: '0.8rem',
        color: 'inherit',
        opacity: 0.8,
        marginTop: '0px',
      }}
      >
        <strong>
          Version
          {' '}
          {__APP_VERSION__}
        </strong>
      </div>
      <p style={{ margin: 0, padding: 0, fontSize: '6pt' }}>&nbsp;</p>
    </div>
  );
}
