import { Ibook } from '../mapStoreToProps';

const initialState = {
  youthPics: [],
};

const reducer = (state = initialState, action: { type: string; data?: Ibook[]; }): {youthPics: Ibook[]} => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return { ...state, youthPics: Array.isArray(action.data) ? action.data.reverse() : [] };
    default: return state;
  }
};

export default reducer;
