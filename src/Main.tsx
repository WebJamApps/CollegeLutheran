import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { PictureProvider } from './providers/Pics.provider';
import { App } from './App';
import store from './redux/store';
import { AuthProvider } from './providers/Auth.provider';
import '../static/styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
function Main() {
  return (
    <GoogleOAuthProvider clientId={process.env.GoogleClientId || ''}>
      <AuthProvider>
        <Provider store={store.store}>
          <PersistGate loading={null} persistor={store.persistor}>
            <PictureProvider>
              <App />
            </PictureProvider>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
const renderMain = (): void => {
  root.render(<StrictMode><Main /></StrictMode>);
};

renderMain();
