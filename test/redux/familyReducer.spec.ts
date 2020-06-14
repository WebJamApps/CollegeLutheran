import reducer from '../../src/redux/reducers/familyReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
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
  it('sets empty array if data is null', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_FAMILYPICS',
        data: null,
      }),
    ).toEqual(
      {
        familyPics: [],
      },
    );
  });
});
