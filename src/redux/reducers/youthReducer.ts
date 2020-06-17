const initialState = {
  youthPics: [],
};

const reducer = (state = initialState, action: { type: string; data: any[]; }) => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return {
        ...state,
        youthPics: Array.isArray(action.data) ? action.data.reverse() : [],
      };
    default:
      return state;
  }
};

export default reducer;
