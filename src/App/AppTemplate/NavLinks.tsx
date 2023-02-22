import { menuItems } from './menuConfig';
import { SideMenuItem } from './SideMenuItem';

interface InavLinksProps {
  handleClose: () => void, userCount?: number, heartBeat?: string,
}
export function NavLinks(props: InavLinksProps) {
  const {
    handleClose,
  } = props;
  return (
    <div className="nav-list" style={{ width: '220px' }}>
      <p style={{ fontSize: '1px', marginBottom: '2px' }} />
      <div className="menu-item" style={{ backgroundColor: '#244a8bff' }}>
        <p style={{ color: '#fff', marginBottom: '2px', fontSize: '11pt' }}>
          <a href="http://bit.ly/CollegeLutheranDirections" className="menu-hover" style={{ color: '#88c1ff' }}>
            <span>210 S. College Ave</span>
          </a>
          <br />
          Salem, VA 24153
        </p>
      </div>
      <div className="menu-item" style={{ backgroundColor: '#244a8bff', marginLeft: '0px' }}>
        <p style={{ color: '#fff', marginBottom: '2px', fontSize: '11pt' }}>
          <span>ph: </span>
          <a href="tel:5403894963" className="menu-hover" style={{ color: '#88c1ff' }}>(540) 389-4963</a>
          <br />
          <span>fax: </span>
          (540) 389-4980
          <br />
          <a style={{ color: '#88c1ff', wordWrap: 'break-word' }} href="mailto:office1@collegelutheran.org">
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
      <p style={{ margin: 0, padding: 0, fontSize: '6pt' }}>&nbsp;</p>
    </div>
  );
}
