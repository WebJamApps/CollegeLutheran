import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import store from './redux/store';
import { AuthProvider } from './providers/Auth.provider';
import '../static/styles.scss';
import { ContentProvider } from './providers/Content.provider';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as HTMLElement);
function Main() {
  return (
    <GoogleOAuthProvider clientId={process.env.GoogleClientId || ''}>
      <AuthProvider>
        <Provider store={store.store}>
          <PersistGate loading={null} persistor={store.persistor}>
            <ContentProvider>
              <ToastContainer position="top-right" autoClose={5000} />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ContentProvider>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
const renderMain = (): void => {
  root.render(
    <StrictMode>
      <Main />
    </StrictMode>,
  );
};

renderMain();
