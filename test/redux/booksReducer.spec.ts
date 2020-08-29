/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from '../../src/redux/reducers/booksReducer';

describe('books reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(
      {
        books: [],
      },
    );
  });
  it('should handle fetched images', () => {
    const dataArr:any[] = [{
      _id: '1', title: 'cool', created_at: '', type: '',
    }];
    expect(
      reducer(undefined, {
        type: 'GOT_BOOKS',
        data: dataArr,
      }),
    ).toEqual(
      {
        books: [{
          _id: '1', title: 'cool', created_at: '', type: '',
        }],
      },
    );
  });
  it('sets empty array if data is undefined', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_BOOKS',
        data: undefined,
      }),
    ).toEqual(
      {
        books: [],
      },
    );
  });
});
