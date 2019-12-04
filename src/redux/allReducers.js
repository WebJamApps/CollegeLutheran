import { combineReducers } from 'redux';
import imagesReducer from './reducers/imagesReducer';
import authReducer from './reducers/authReducer';
import songReducer from './reducers/songReducer';
import tourReducer from './reducers/tourReducer';

const reducer = combineReducers({
  images: imagesReducer,
  auth: authReducer,
  songs: songReducer,
  tour: tourReducer,
});

export default reducer;
