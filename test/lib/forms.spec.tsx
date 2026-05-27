import { render, fireEvent } from '@testing-library/react';
import forms, { DataDropParams } from '../../src/lib/forms';

describe('forms', () => {
  it('makeDropDown', () => {
    const onChangeMock = vi.fn();
    const { container } = render(forms.makeDropdown('test', 'test', 'test', onChangeMock, []));
    const select = container.querySelector('select')!;
    fireEvent.change(select, { target: { value: 'x' } });
    expect(onChangeMock).toHaveBeenCalled();
  });
  it('makeDataDropDown', () => {
    const props = {
      htmlFor: 'test', labelText: 'test', value: 'test', onChange: vi.fn(), options: [],
    };
    const { container } = render(forms.makeDataDropdown({ ...props } as unknown as DataDropParams));
    const select = container.querySelector('select')!;
    fireEvent.change(select, { target: { value: 'x' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
