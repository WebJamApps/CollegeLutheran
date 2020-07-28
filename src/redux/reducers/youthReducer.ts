import { Ibook } from '../mapStoreToProps';

const startState = {
  youthPics: [],
};

const reducer = (state = startState, action: { type: string; data?: Ibook[]; }): {youthPics: Ibook[]} => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return { ...state, youthPics: Array.isArray(action.data) ? action.data.reverse() : [] };
    default: return state;
  }
};

export default reducer;
