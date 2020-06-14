const initialState = {
  otherPics: [],
  editPic: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_OTHERPICS':
      return {
        ...state,
        otherPics: Array.isArray(action.data) ? action.data.reverse() : [],
      };
    case 'EDIT_PIC':
      return {
        ...state, editPic: action.picData,
      };
    default:
      return state;
  }
};

export default reducer;
