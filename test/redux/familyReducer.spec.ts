import reducer from '../../src/redux/reducers/familyReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '', data: [] })).toEqual(
      {
        familyPics: [],
      },
    );
  });
  it('should handle fetched images', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_FAMILYPICS',
        data: [{
          title: '', _id: '', type: '', created_at: '',
        }],
      }),
    ).toEqual(
      {
        familyPics: [{
          title: '', _id: '', type: '', created_at: '',
        }],
      },
    );
  });
  it('sets empty array if data is undefined', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_FAMILYPICS',
        data: undefined,
      }),
    ).toEqual(
      {
        familyPics: [],
      },
    );
  });
});
