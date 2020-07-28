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
        data: [{
          _id: '123', title: '', created_at: '', type: '',
        }],
      }),
    ).toEqual(
      {
        youthPics: [{
          _id: '123', title: '', created_at: '', type: '',
        }],
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
