import { combineReducers } from 'redux';
import imagesReducer from './reducers/imagesReducer';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
// import tourReducer from './reducers/tourReducer';

const reducer = combineReducers({
  images: imagesReducer,
  auth: authReducer,
  homeContent: homeReducer,
  // tour: tourReducer,
});

export default reducer;
