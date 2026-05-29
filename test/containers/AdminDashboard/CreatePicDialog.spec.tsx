/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from '@testing-library/react';
import { PicTextField, CreatePicDialog } from 'src/containers/AdminDashboard/CreatePicDialog';
import utils from 'src/containers/AdminDashboard/utils';

describe('CreatePicDialog', () => {
  it('renders CreatePicDialog', () => {
    const { container } = render(<CreatePicDialog showEditor="createPic" onClose={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });
  it('handles onChange for PicTextField', () => {
    const setPic = vi.fn();
    const props = {
      label: '',
      url: true,
      title: true,
      setPic,
      pic: {
        title: '', type: '', url: '', comments: '', _id: '',
      },
    };
    const { container } = render(<PicTextField {...props} />);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement | null;
    expect(input).not.toBeNull();
    fireEvent.change(input!, { target: { value: 'newurl' } });
    expect(setPic).toHaveBeenCalled();
  });
  it('handles onClick for CreatePicDialog', () => {
    const props = { showEditor: 'createPic', onClose: vi.fn() };
    utils.createPicAPI = vi.fn();
    const { container } = render(<CreatePicDialog {...props} />);
    // Fill required fields so the create button is enabled (isFormValid: title + url not empty)
    const inputs = container.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => fireEvent.change(input, { target: { value: 'x' } }));
    const btn = container.querySelector('.createPicButton') as HTMLButtonElement | null;
    expect(btn).not.toBeNull();
    fireEvent.click(btn!);
    expect(utils.createPicAPI).toHaveBeenCalled();
  });
});
