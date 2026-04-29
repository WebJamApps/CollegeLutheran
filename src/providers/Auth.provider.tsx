import { createContext, useState, ReactNode } from 'react';

export interface Iauth {
  isAuthenticated: boolean,
  error: string,
  token: string,
  user: {
    userType: string;
    email: string,
  };
}

export const defaultAuth: Iauth = {
  isAuthenticated: false,
  error: '',
  token: '',
  user: { userType: '', email: '' },
};

export const defaultSetAuth = (_arg0: Iauth) => { /* no-op placeholder */ };

export const AuthContext = createContext({
  auth: defaultAuth,
  setAuth: defaultSetAuth,
});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const { Provider } = AuthContext;
  const [auth, setAuth] = useState(defaultAuth);
  return (<Provider value={{ auth, setAuth }}>{children}</Provider>
  );
}
