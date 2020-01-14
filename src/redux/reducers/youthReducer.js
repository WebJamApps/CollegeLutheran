const initialState = {
  youthPics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return { ...state, youthPics: action.data };
    default:
      return state;
  }
};

export default reducer;
