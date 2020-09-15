import { Ibook } from '../mapStoreToProps';

interface IMusicReducer {
  type: string;
  data?: Ibook[];
}

const initialState = {
  musicPics: [],
};

const reducer = (state = initialState, action: IMusicReducer): { musicPics: Ibook[] } => {
  const musicArray = Array.isArray(action.data) ? action.data.reverse() : [];
  switch (action.type) {
    case 'GOT_MUSICPICS':
      return { ...state, musicPics: musicArray };
    default: return state;
  }
};

export default reducer;
