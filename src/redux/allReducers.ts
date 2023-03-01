import { combineReducers } from 'redux';
import homeReducer from './reducers/homeReducer';
import booksReducer from './reducers/booksReducer';
import tableReducer from './reducers/tableReducer';
import youthContentReducer from './reducers/youthContentReducer';

const reducer = combineReducers({
  homeContent: homeReducer,
  youthContent: youthContentReducer,
  books: booksReducer,
  showTable: tableReducer,
});

export default reducer;
