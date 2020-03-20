const initialState = {
  otherPics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_OTHERPICS':
      return {
        ...state,
        otherPics: Array.isArray(action.data) ? action.data.reverse() : [],
      };
    default:
      return state;
  }
};

export default reducer;
