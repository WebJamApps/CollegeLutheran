import type { Dispatch } from 'react';
import type { Auth } from '../redux/mapStoreToProps';

export interface AppProps {
  dispatch: Dispatch<unknown>,
  auth: Auth
}

