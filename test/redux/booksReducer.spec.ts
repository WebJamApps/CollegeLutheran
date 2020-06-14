import reducer from '../../src/redux/reducers/booksReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        books: [],
      },
    );
  });
  it('should handle fetched images', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_BOOKS',
        data: [{}],
      }),
    ).toEqual(
      {
        books: [{}],
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
