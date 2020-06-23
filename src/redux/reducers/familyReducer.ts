const initialState = {
  familyPics: [],
};

const fixUrl = (state: { familyPics: any[]; }, action: { type: string; data: any[]; }) => {
  let familyPics: any[] = [];
  if (Array.isArray(action.data)) familyPics = action.data.reverse();
  return { ...state, familyPics };
};

const reducer = (state = initialState, action: { type: string; data: any[]; }) => {
  switch (action.type) {
    case 'GOT_FAMILYPICS': return fixUrl(state, action);
    default: return state;
  }
};

export default reducer;
