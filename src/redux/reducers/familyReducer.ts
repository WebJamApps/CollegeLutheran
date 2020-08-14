import { Ibook } from '../mapStoreToProps';

const initialState = {
  familyPics: [],
};

const fixUrl = (state: { familyPics: Ibook[]; }, action: { type: string; data?: Ibook[]; }) => {
  let familyPics: Ibook[] = [];
  if (Array.isArray(action.data)) familyPics = action.data.reverse();
  return { ...state, familyPics };
};

const reducer = (state = initialState, action: { type: string; data?: Ibook[]; }): { familyPics: Ibook[] } => {
  switch (action.type) {
    case 'GOT_FAMILYPICS': return fixUrl(state, action);
    default: return state;
  }
};

export default reducer;
