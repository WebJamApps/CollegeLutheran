import { Ibook } from '../mapStoreToProps';

interface IMusicReducer {
  type: string;
  data?: Ibook[];
}

const initialState = {
  musicPics: [],
};

const reducer = (state = initialState, action: IMusicReducer): { musicPics: Ibook[] } => {
  switch (action.type) {
    case 'GOT_MUSICPICS':
      return { ...state, musicPics: Array.isArray(action.data) ? action.data.reverse() : [] };
    default: return state;
  }
};

export default reducer;
