/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AdminUserForm from '../../src/components/AdminUserForm';

describe('AdminUserForm', () => {
  let wrapper:ShallowWrapper, adminDashboardStub:any = {};
  beforeEach(() => {
    adminDashboardStub = {
      onChangeAdminEmail: jest.fn(),
      state: { formError: 'bad' },
      controller: { validateAdmin: jest.fn() },
    };
    wrapper = shallow(<AdminUserForm comp={adminDashboardStub} />);
  });
  it('renders correctly', () => { expect(wrapper).toMatchSnapshot(); });
});
