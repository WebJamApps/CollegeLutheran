import reducer from '../../src/redux/reducers/tableReducer';

describe('fetch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        showTable: true,
      },
    );
  });
  it('should handle changing showTable props', () => {
    expect(
      reducer(undefined, {
        type: 'SHOW_TABLE',
        showTable: true,
      }),
    ).toEqual(
      {
        showTable: true,
      },
    );
  });
});
