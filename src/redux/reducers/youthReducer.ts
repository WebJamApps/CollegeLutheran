import { Ibook } from '../mapStoreToProps';

interface IYouthReducer {
  type: string;
  data?: Ibook[];
}

const initialState = {
  youthPics: [],
};

const reducer = (state = initialState, action: IYouthReducer): { youthPics: Ibook[] } => {
  switch (action.type) {
    case 'GOT_YOUTHPICS':
      return { ...state, youthPics: Array.isArray(action.data) ? action.data.reverse() : [] };
    default: return state;
  }
};

export default reducer;
