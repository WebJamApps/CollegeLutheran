/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import YouthPageEditor from '../../src/components/YouthPageEditor';
import Forms from '../../src/lib/forms';

describe('YouthPageEditor', () => {
  let wrapper:ShallowWrapper, adminDashboardStub:any = {};
  beforeEach(() => {
    adminDashboardStub = {
      setState: jest.fn(),
      onChangeAdminEmail: jest.fn(),
      state: { formError: 'bad' },
      controller: { validateAdmin: jest.fn(), editor: jest.fn(), putAPI: jest.fn() },
      forms: { makeInput: () => ({ onChange: () => adminDashboardStub.setState() }) },
    };
    wrapper = shallow(<YouthPageEditor comp={adminDashboardStub} youthTitle="Youth News" youthContent="Howdy!" makeInput={Forms.makeInput} />);
  });
  it('renders correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('handles onChange youthTitle', () => {
    wrapper.find('input').simulate('change', { target: { value: 'Youth News' } });
    expect(adminDashboardStub.setState).toHaveBeenCalled();
  });
  it('click button to submit', () => {
    wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
    expect(adminDashboardStub.controller.putAPI).toHaveBeenCalled();
  });
});
