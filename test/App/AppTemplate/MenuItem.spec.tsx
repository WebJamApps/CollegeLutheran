import renderer from 'react-test-renderer';
import { sortBulletins, setBulletin, MenuItem } from 'src/App/AppTemplate/MenuItem';
import type { ImenuItem } from 'src/App/AppTemplate/menuItems';
import type { Iauth, Ibook } from 'src/redux/mapStoreToProps';

describe('MenuItem', () => {
  it('sorts the bulletins by date', () => {
    const bulletins = [{
      _id: 'a', type: '', created_at: '1972-01-03T00:00:00Z', title: 'bulletin1',
    },
    {
      _id: 'b', type: '', created_at: '1971-01-03T00:00:00Z', title: 'bulletin2',
    },
    {
      _id: 'b', type: '', created_at: '1973-01-03T00:00:00Z', title: 'bulletin2',
    },
    {
      _id: 'c', type: '', created_at: '1973-01-03T00:00:00Z', title: 'bulletin3',
    },
    {
      _id: 'd', type: '', created_at: '1974-01-03T00:00:00Z', title: 'bulletin4',
    },
    ];

    const results = sortBulletins(bulletins);
    expect(results[0]._id).toBe('d');
    expect(results[1]._id).toBe('b' || 'c');
    expect(results[2]._id).toBe('c' || 'b');
    expect(results[3]._id).toBe('a');
  });
  it('sets link to first bulletin listed', () => {
    const bArr = [{ comments: 'worshipbulletin', url: 'https://whatever.com' }] as Ibook[];
    const item = {
      classname: '', type: 'link', iconClass: '', link: '', name: '',
    };
    const results = setBulletin(item, bArr);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(results.link).toBe('https://whatever.com');
  });
  it('sets link for bulletin to empty string when url is undefined', () => {
    const bArr = [{ comments: 'worshipbulletin' }] as Ibook[];
    const item = {
      classname: '', type: 'link', iconClass: '', link: '', name: '',
    };
    const results = setBulletin(item, bArr);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(results.link).toBe('');
  });
  it('renders a empty MenuItem when we are already on the staff page', () => {
    const props = {
      menu: { link: '/staff' } as ImenuItem,
      index: 1,
      location: { pathname: '/staff' },
      auth: {} as Iauth,
      books: [] as Ibook[],
      setMenuOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const menuItem = renderer
      .create(<MenuItem {...props} />)
      .toJSON();
    expect(menuItem).toBeNull();
  });
});
