import { Book } from '../mapStoreToProps';

const initialState = {
  books: [],
};

const reducer = (state = initialState, action: { type: string; data: Book[]; }) => {
  switch (action.type) {
    case 'GOT_BOOKS':
      return { ...state, books: Array.isArray(action.data) ? action.data.reverse() : [] };
    default: return state;
  }
};

export default reducer;
