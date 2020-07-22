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
    expect(
      reducer(undefined, {
        type: 'GOT_BOOKS',
        data: [{
          _id: '1', title: 'cool', created_at: '', type: 'howdy',
        }],
      }),
    ).toEqual(
      {
        books: [{
          _id: '1', title: 'cool', created_at: '', type: 'howdy',
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
