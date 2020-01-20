import { combineReducers } from 'redux';
import imagesReducer from './reducers/imagesReducer';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
import familyReducer from './reducers/familyReducer';
import youthReducer from './reducers/youthReducer';
import booksReducer from './reducers/booksReducer';
// import tourReducer from './reducers/tourReducer';

const reducer = combineReducers({
  images: imagesReducer,
  auth: authReducer,
  homeContent: homeReducer,
  familyPics: familyReducer,
  youthPics: youthReducer,
  books: booksReducer,
  // tour: tourReducer,
});

export default reducer;
