import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { PictureProvider } from './Providers/PicsProvider';
import ConnectedApp from './App';
import store from './redux/store';
import '../static/styles.scss';

// eslint-disable-next-line function-paren-newline
render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.GoogleClientId || ''}>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <PictureProvider>
            <ConnectedApp />
          </PictureProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>, document.getElementById('root'));
/* istanbul ignore next */
if (process.env.NODE_ENV === 'development' && module.hot) module.hot.accept();
