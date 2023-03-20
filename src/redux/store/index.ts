import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storageSession from 'redux-persist/lib/storage/session';
import allReducers from '../allReducers';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['sc', 'familyPics', 'youthPics', 'musicPics', 'habitatPics'],
};
const mWares = applyMiddleware(thunk);
const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer, mWares);
const persistor = persistStore(store);
export default { store, persistor };
