const initialState = {
  newsContent: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_NEWS':
      return {
        ...state,
        newsContent: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
