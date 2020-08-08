import { Ibook } from '../mapStoreToProps';

const initialState = {
  otherPics: [],
  editPic: {},
};

const reducer = (state = initialState, action: { type: string; data?: Ibook[]; picData?: Record<string, unknown>; }): {
  otherPics: Ibook[]; editPic: Record<string, unknown> | undefined
} => {
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
