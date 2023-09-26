import renderer from 'react-test-renderer';
import forms, { DataDropParams } from '../../src/lib/forms';

describe('forms', () => {
  it('makeDropDown', () => {
    const onChangeMock = jest.fn();
    const input = renderer.create(forms.makeDropdown('test', 'test', 'test', onChangeMock, [])).root;
    input.findByType('select').props.onChange();
    expect(onChangeMock).toHaveBeenCalled();
  });
  it('makeDataDropDown', () => {
    const props = {
      htmlFor: 'test', labelText: 'test', value: 'test', onChange: jest.fn(), options: [],
    };
    const input = renderer.create(forms.makeDataDropdown({ ...props } as unknown as DataDropParams)).root;
    const result = input.findByType('select').props.onChange();
    console.log(result);
  });
});
