/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from '../../src/redux/reducers/otherReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(
      {
        otherPics: [],
        editPic: {},
      },
    );
  });
  it('should handle fetched images', () => {
    const dataArr:any[] = [{
      title: '', _id: '', type: '', created_at: '',
    }];
    expect(
      reducer(undefined, {
        type: 'GOT_OTHERPICS',
        data: dataArr,
      }),
    ).toEqual(
      {
        otherPics: [{
          title: '', _id: '', type: '', created_at: '',
        }],
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
  it('sets empty array if data is undefined', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_OTHERPICS',
        data: undefined,
      }),
    ).toEqual(
      {
        otherPics: [],
        editPic: {},
      },
    );
  });
});
