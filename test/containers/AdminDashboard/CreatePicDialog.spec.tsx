/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, screen } from '@testing-library/react';
import { PicTextField, CreatePicDialog } from 'src/containers/AdminDashboard/CreatePicDialog';
import utils from 'src/containers/AdminDashboard/utils';

describe('CreatePicDialog', () => {
  it('renders CreatePicDialog', () => {
    const { container } = render(<CreatePicDialog showEditor="createPic" onClose={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });
  it('displays category helper text', () => {
    render(<CreatePicDialog showEditor="createPic" onClose={vi.fn()} />);
    expect(screen.getByText(/All pictures will appear on the homepage/i)).not.toBeNull();
  });
  it('handles onChange for PicTextField and converts dropbox URLs', () => {
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
    fireEvent.change(input!, { target: { value: 'https://www.dropbox.com/s/123/pic.jpg' } });
    expect(setPic).toHaveBeenCalledWith(expect.objectContaining({
      url: 'https://dl.dropboxusercontent.com/s/123/pic.jpg',
    }));
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
  it('shows thumbnail preview and handles image load error', () => {
    const props = { showEditor: 'createPic', onClose: vi.fn() };
    const { container } = render(<CreatePicDialog {...props} />);
    const inputs = container.querySelectorAll('input[type="text"]');
    // Input 0 is url, Input 1 is title
    fireEvent.change(inputs[0], { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.change(inputs[1], { target: { value: 'Test Title' } });
    const img = container.querySelector('.pic-thumbnail-preview') as HTMLImageElement | null;
    expect(img).not.toBeNull();
    expect(img?.src).toBe('https://example.com/image.jpg');

    // Trigger image load error
    fireEvent.error(img!);
    expect(screen.getByText(/Failed to load image from URL/i)).not.toBeNull();
    const btn = container.querySelector('.createPicButton') as HTMLButtonElement | null;
    expect(btn?.disabled).toBe(true);
  });
});

