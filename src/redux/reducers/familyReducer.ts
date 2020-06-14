const initialState = {
  familyPics: [],
};

const fixUrl = (state, action) => {
  let familyPics = [];
  if (Array.isArray(action.data)) familyPics = action.data.reverse();
  return { ...state, familyPics };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_FAMILYPICS':
      return fixUrl(state, action);
    default:
      return state;
  }
};

export default reducer;
