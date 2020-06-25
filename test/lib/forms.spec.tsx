import { shallow } from 'enzyme';
import forms from '../../src/lib/forms';

describe('forms', () => {
  it('handles on change dropdown', () => {
    const onChange = jest.fn();
    const mdd = forms.makeDropdown('id', 'txt', 'value', onChange, []);
    const dd = shallow(mdd);
    dd.find('select').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
  it('handles on change datadropdown', () => {
    const onChange = jest.fn();
    const ddParams = {
      htmlFor: 'id', labelText: 'txt', value: 'value', onChange, options: [], oValue: 'oValue', dValue: 'dValue',
    };
    const mdd = forms.makeDataDropdown(ddParams);
    const dd = shallow(mdd);
    dd.find('select').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
  it('makes a required input', () => {
    const onChange = jest.fn();
    const iParams = {
      type: 'text', label: 'txt', isRequired: true, onChange, value: 'value', width: '90px',
    };
    const i = forms.makeInput(iParams);
    const inp = shallow(i);
    expect(inp.find('input').prop('required')).toBe(true);
  });
});
