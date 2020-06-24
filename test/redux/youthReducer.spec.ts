import reducer from '../../src/redux/reducers/youthReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(
      {
        youthPics: [],
      },
    );
  });
  it('should handle fetched images', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_YOUTHPICS',
        data: [{}],
      }),
    ).toEqual(
      {
        youthPics: [{}],
      },
    );
  });
  it('sets empty array if data is undefined', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_YOUTHPICS',
        data: undefined,
      }),
    ).toEqual(
      {
        youthPics: [],
      },
    );
  });
});
