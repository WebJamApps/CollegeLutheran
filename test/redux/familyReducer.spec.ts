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
        data: [{}],
      }),
    ).toEqual(
      {
        familyPics: [{}],
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
