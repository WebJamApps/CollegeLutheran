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
    <div className="nav-list" style={{ width: '180px' }}>
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
