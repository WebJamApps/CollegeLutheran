/* eslint-disable @typescript-eslint/no-explicit-any */
import superagent from 'superagent';
import { store } from 'react-notifications-component';
import { authenticate } from '../../../src/App/AppTemplate/authenticate';
import type { Auth } from '../../../src/redux/mapStoreToProps';

describe('authActions', () => {
  it('is defined', ()=>{
    expect(authenticate).toBeDefined();
  });
  // TODO update when new google package is implemented
  // it('authenticates', async () => {
  //   const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
  //   superagent.post = jest.fn(() => postReturn);
  //   const gBody: GoogleBody = {
  //     code: 'someCode',
  //     clientId: '',
  //     redirectUri: '',
  //     state() {
  //       const randomString = '';
  //       return randomString;
  //     },
  //   };
  //   const auth: Auth = {
  //     isAuthenticated: false, error: '', email: '', token: '', user: { userType: '' },
  //   };
  //   const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
  //   expect(result).toBe('authenticated');
  // });
  // it('does not fetch if already authenticated', async () => {
  //   const gBody: any = {
  //     code: 'someCode',
  //     clientId: '',
  //     redirectUri: '',
  //     state() {
  //       const randomString = '';
  //       return randomString;
  //     },
  //   };
  //   const auth: Auth = {
  //     isAuthenticated: true, error: '', email: '', token: '', user: { userType: '' },
  //   };
  //   const result = await authenticate(gBody, jest.fn());
  //   expect(result).toBe('authenticated');
  // });
  // TODO fix this when new google auth has been implemented
  // it('returns false when nothing is returned from Google', async () => {
  //   Object.defineProperty(store, 'addNotification', {
  //     writable: true,
  //     value: jest.fn(),
  //   });
  //   const postReturn: any = ({
  //     set: () => ({ send: async () => ({ body: undefined }) }),
  //   });
  //   superagent.post = jest.fn(() => postReturn);
  //   const gBody: GoogleBody = {
  //     code: 'someCode',
  //     clientId: '',
  //     redirectUri: '',
  //     state() {
  //       const randomString = '';
  //       return randomString;
  //     },
  //   };
  //   const auth: Auth = {
  //     isAuthenticated: false, error: '', email: '', token: '', user: { userType: '' },
  //   };
  //   const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
  //   expect(result).toBe('authenticated');
  // });
  // it('returns error when fetch error', async () => {
  //   Object.defineProperty(store, 'addNotification', {
  //     writable: true,
  //     value: jest.fn(),
  //   });
  //   const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
  //   superagent.post = jest.fn(() => postReturn);
  //   const gBody: GoogleBody = {
  //     code: 'someCode',
  //     clientId: '',
  //     redirectUri: '',
  //     state() {
  //       const randomString = '';
  //       return randomString;
  //     },
  //   };
  //   const auth: Auth = {
  //     isAuthenticated: false, error: '', email: '', token: '', user: { userType: '' },
  //   };
  //   await expect(authenticate(gBody, { dispatch: jest.fn(), auth })).rejects.toThrow('bad');
  // });
});
