/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from '../../src/redux/reducers/musicReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '', data: [] })).toEqual(
      {
        musicPics: [],
      },
    );
  });
  it('should handle fetched images', () => {
    const dataArr:any[] = [{
      title: '', _id: '', type: '', created_at: '',
    }];
    expect(
      reducer(undefined, {
        type: 'GOT_MUSICPICS',
        data: dataArr,
      }),
    ).toEqual(
      {
        musicPics: [{
          title: '', _id: '', type: '', created_at: '',
        }],
      },
    );
  });
  it('sets empty array if data is undefined', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_MUSICPICS',
        data: undefined,
      }),
    ).toEqual(
      {
        musicPics: [],
      },
    );
  });
});
