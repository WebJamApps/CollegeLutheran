// import type { Ibook } from '../mapStoreToProps';
import type { Ipicture, PictureContext } from 'src/providers/Pics.provider';

interface IMusicReducer {
  type: string;
  data?: Ipicture[];
}

const initialState = {
  musicPics: [],
};

const reducer = (state = initialState, action: IMusicReducer): { musicPics: Ipicture[] } => {
  const musicArray = Array.isArray(action.data) ? action.data.reverse() : [];
  switch (action.type) {
    case 'GOT_MUSICPICS':
      return { ...state, musicPics: musicArray };
    default: return state;
  }
};

export default reducer;
