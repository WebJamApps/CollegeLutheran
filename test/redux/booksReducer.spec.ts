import reducer from '../../src/redux/reducers/booksReducer';

describe('fetch reducer', () => {
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
        data: [{ _id: 1, title: 'cool' }],
      }),
    ).toEqual(
      {
        books: [{ _id: 1, title: 'cool' }],
      },
    );
  });
  it('sets empty array if data is null', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_BOOKS',
        data: null,
      }),
    ).toEqual(
      {
        books: [],
      },
    );
  });
});
