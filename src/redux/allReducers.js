import { combineReducers } from 'redux';
import imagesReducer from './reducers/imagesReducer';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
import familyReducer from './reducers/familyReducer';
import newsReducer from './reducers/newsReducer';
// import tourReducer from './reducers/tourReducer';

const reducer = combineReducers({
  images: imagesReducer,
  auth: authReducer,
  homeContent: homeReducer,
  familyPics: familyReducer,
  newsContent: newsReducer,
  // tour: tourReducer,
});

export default reducer;
