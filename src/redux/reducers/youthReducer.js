const initialState = {
  youthPics: [],
};

const fixUrl = (state, action) => {
  let picArr = [];
  if (Array.isArray(action.data)) picArr = action.data;
  const youthPics = picArr.map((i) => {
    const newPic = i;
    newPic.url = i.comments;
    return newPic;
  });
  return {
    ...state,
    youthPics,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return fixUrl(state, action);
    default:
      return state;
  }
};

export default reducer;
