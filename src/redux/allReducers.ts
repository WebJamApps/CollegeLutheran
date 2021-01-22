import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
import familyReducer from './reducers/familyReducer';
import youthReducer from './reducers/youthReducer';
import musicReducer from './reducers/musicReducer';
import booksReducer from './reducers/booksReducer';
import otherReducer from './reducers/otherReducer';
import tableReducer from './reducers/tableReducer';
import youthContentReducer from './reducers/youthContentReducer';

const reducer = combineReducers({
  auth: authReducer,
  homeContent: homeReducer,
  youthContent: youthContentReducer,
  familyPics: familyReducer,
  youthPics: youthReducer,
  books: booksReducer,
  otherPics: otherReducer,
  musicPics: musicReducer,
  showTable: tableReducer,
});

export default reducer;
