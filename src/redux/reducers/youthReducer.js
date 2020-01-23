const initialState = {
  youthPics: [],
};

const sortPics = (state, action) => {
  const youthPics = action.data;
  youthPics.reverse();
  return { ...state, youthPics: action.data };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return sortPics(state, action);
    default:
      return state;
  }
};

export default reducer;
