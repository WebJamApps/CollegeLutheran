const initialState = {
  books: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_BOOKS':
      return {
        ...state,
        books: action.data.reverse(),
      };
    default:
      return state;
  }
};

export default reducer;
