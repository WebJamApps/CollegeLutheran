import reducer from '../../src/redux/reducers/homeReducer';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        homeContent: {},
      },
    );
  });
  it('should handle fetch homepage', () => {
    expect(
      reducer(undefined, {
        type: 'GOT_HOMEPAGE',
        data: {},
      }),
    ).toEqual(
      {
        homeContent: {},
      },
    );
  });
});
