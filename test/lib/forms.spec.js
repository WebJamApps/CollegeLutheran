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
    const mdd = forms.makeDataDropdown('id', 'txt', 'value', onChange, [], 'oValue', 'dValue');
    const dd = shallow(mdd);
    dd.find('select').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
  it('makes a required input', () => {
    const onChange = jest.fn();
    const i = forms.makeInput('text', 'txt', true, onChange, 'value', '90px');
    const inp = shallow(i);
    expect(inp.find('input').prop('required')).toBe(true);
  });
});
