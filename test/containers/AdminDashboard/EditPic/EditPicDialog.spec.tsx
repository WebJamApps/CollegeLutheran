/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, screen } from '@testing-library/react';
import { EditPicDialog } from 'src/containers/AdminDashboard/EditPic/EditPicDialog';
import { defaultPic } from 'src/containers/AdminDashboard/utils';
import picUtils from 'src/containers/AdminDashboard/pictures.utils';

describe('EditPicDialog', () => {
  it('renders EditPicDialog', () => {
    const props = {
      onClose: vi.fn(), editPic: defaultPic, setEditPic: vi.fn(),
    };
    const { container } = render(<EditPicDialog {...props} />);
    expect(container).toMatchSnapshot();
  });
  it('displays category helper text', () => {
    const props = { onClose: vi.fn(), editPic: { ...defaultPic, _id: '123' }, setEditPic: vi.fn() };
    render(<EditPicDialog {...props} />);
    expect(screen.getByText(/All pictures will appear on the homepage/i)).not.toBeNull();
  });
  it('handles change events for url and title fields and fixes dropbox links', () => {
    const setEditPic = vi.fn();
    const editPic = { ...defaultPic, _id: '123' };
    const props = { onClose: vi.fn(), editPic, setEditPic };
    const { container } = render(<EditPicDialog {...props} />);
    const url = container.querySelector('input[aria-label="* URL"]') as HTMLInputElement | null;
    const title = container.querySelector('input[aria-label="* Title"]') as HTMLInputElement | null;
    expect(url).not.toBeNull();
    expect(title).not.toBeNull();
    fireEvent.change(url!, { target: { value: 'https://www.dropbox.com/s/123/pic.png' } });
    expect(setEditPic).toHaveBeenCalledWith(expect.objectContaining({
      url: 'https://dl.dropboxusercontent.com/s/123/pic.png',
    }));
    fireEvent.change(title!, { target: { value: 'title' } });
    expect(setEditPic).toHaveBeenCalled();
  });
  it('renders the editPicDialog wrapper', () => {
    const props = { editPic: defaultPic, onClose: vi.fn(), setEditPic: vi.fn() };
    const { container } = render(<EditPicDialog {...props} />);
    expect(container.querySelector('.editPicDialog')).not.toBeNull();
  });
  it('handles update / delete / cancel button clicks', () => {
    picUtils.updatePic = vi.fn();
    picUtils.deletePic = vi.fn();
    const setEditPic = vi.fn();
    const editPic = { ...defaultPic, title: 't', url: 'u' };
    const props = { editPic, onClose: vi.fn(), setEditPic };
    const { container } = render(<EditPicDialog {...props} />);
    fireEvent.click(container.querySelector('.updatePicButton') as HTMLButtonElement);
    expect(picUtils.updatePic).toHaveBeenCalled();
    fireEvent.click(container.querySelector('.deletePicButton') as HTMLButtonElement);
    expect(picUtils.deletePic).toHaveBeenCalled();
    fireEvent.click(container.querySelector('.cancelPicButton') as HTMLButtonElement);
    expect(setEditPic).toHaveBeenCalled();
  });
  it('shows thumbnail preview and handles image load error', () => {
    const editPic = { ...defaultPic, _id: '123', title: 'Test Title', url: 'https://example.com/pic.jpg' };
    const props = { editPic, onClose: vi.fn(), setEditPic: vi.fn() };
    const { container } = render(<EditPicDialog {...props} />);
    const img = container.querySelector('.pic-thumbnail-preview') as HTMLImageElement | null;
    expect(img).not.toBeNull();
    expect(img?.src).toBe('https://example.com/pic.jpg');

    // Trigger image load error
    fireEvent.error(img!);
    expect(screen.getByText(/Failed to load image from URL/i)).not.toBeNull();
    const btn = container.querySelector('.updatePicButton') as HTMLButtonElement | null;
    expect(btn?.disabled).toBe(true);
  });
});

