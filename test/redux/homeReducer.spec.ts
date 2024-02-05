/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from '../../src/redux/reducers/homeReducer';

describe('home reducer', () => {
  const data: any = {
    title: '', _id: '', type: '', created_at: '',
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {
      type: '',
      data,
    })).toEqual(
      {
        homeContent: {},
      },
    );
  });
  it('should handle fetch homepage', () => {
    const data2: any = {
      title: '', _id: '', type: '', created_at: '',
    };
    expect(
      reducer(undefined, {
        type: 'GOT_HOMEPAGE',
        data: data2,
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
