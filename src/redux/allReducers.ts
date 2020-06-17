import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
import familyReducer from './reducers/familyReducer';
import youthReducer from './reducers/youthReducer';
import booksReducer from './reducers/booksReducer';
import otherReducer from './reducers/otherReducer';
import tableReducer from './reducers/tableReducer';

const reducer = combineReducers({
  auth: authReducer,
  homeContent: homeReducer,
  familyPics: familyReducer,
  youthPics: youthReducer,
  books: booksReducer,
  otherPics: otherReducer,
  showTable: tableReducer,
});

export default reducer;