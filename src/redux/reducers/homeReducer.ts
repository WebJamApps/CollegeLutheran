const initialState = {
  homeContent: {},
};

const reducer = (state = initialState, action: { type: string; data?: any; }) => {
  switch (action.type) {
    case 'GOT_HOMEPAGE':
      return {
        ...state,
        homeContent: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
