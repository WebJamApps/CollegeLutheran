import reducer from '../../src/redux/reducers/homeReducer';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {
      type: '',
      data: {
        title: '', _id: '', type: '', created_at: '',
      },
    })).toEqual(
      {
        homeContent: {},
      },
    );
  });
  it('should handle fetch homepage', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_HOMEPAGE',
        data: {
          title: '', _id: '', type: '', created_at: '',
        },
      }),
    ).toEqual(
      {
        homeContent: {
          title: '', _id: '', type: '', created_at: '',
        },
      },
    );
  });
});
