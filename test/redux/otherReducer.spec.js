import reducer from '../../src/redux/reducers/otherReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        otherPics: [],
      },
    );
  });
  it('should handle fetched images', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_OTHERPICS',
        data: [{}],
      }),
    ).toEqual(
      {
        otherPics: [{}],
      },
    );
  });
});
