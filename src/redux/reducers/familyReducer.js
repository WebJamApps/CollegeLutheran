const initialState = {
  familyPics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_FAMILYPICS':
      return {
        ...state,
        familyPics: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
