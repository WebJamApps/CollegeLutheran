import { Ibook } from '../mapStoreToProps';

const initialState = {
  youthContent: {},
};

const reducer = (state = initialState, action: { type: string; data: Ibook; }): Record<string, unknown> => {
  switch (action.type) {
    case 'GOT_YOUTHPAGE':
      return {
        ...state,
        youthContent: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
