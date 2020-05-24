import reducer from '../../src/redux/reducers/otherReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        otherPics: [],
        editPic: {},
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
        editPic: {},
      },
    );
  });
  it('handles EDIT_PIC', () => {
    expect(
      reducer(undefined, {
        type: 'EDIT_PIC',
        picData: { _id: '123' },
      }),
    ).toEqual(
      {
        otherPics: [],
        editPic: { _id: '123' },
      },
    );
  });
  it('sets empty array if data is null', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_OTHERPICS',
        data: null,
      }),
    ).toEqual(
      {
        otherPics: [],
        editPic: {},
      },
    );
  });
});
