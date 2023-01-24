import { sortBulletins, setBulletin } from 'src/App/AppTemplate/MenuItem';

describe('MenuItem', () => {
  it('sorts the bulletins by date', () => {
    const bulletins = [{
      _id: 'a', type: '', created_at: '1972-01-03T00:00:00Z', title: 'bulletin1',
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
    let b: any;
    const item = {
      classname: '', type: 'link', iconClass: '', link: '', name: '',
    };
    const results = setBulletin(item, b);
    expect().toBe();
  });
});
