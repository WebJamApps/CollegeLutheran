const initialState = {
  familyPics: [],
};

const fixUrl = (state, action) => {
  let picArr = [];
  if (Array.isArray(action.data)) picArr = action.data;
  const familyPics = picArr.map((i) => {
    const newPic = i;
    newPic.url = i.comments;
    return newPic;
  });
  return {
    ...state,
    familyPics,
  };
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
