/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from '@testing-library/react';
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
  it('handles change events for url and title fields', () => {
    const setEditPic = vi.fn();
    const props = { onClose: vi.fn(), editPic: defaultPic, setEditPic };
    const { container } = render(<EditPicDialog {...props} />);
    const url = container.querySelector('input[label="* URL"]') as HTMLInputElement | null;
    const title = container.querySelector('input[label="* Title"]') as HTMLInputElement | null;
    expect(url).not.toBeNull();
    expect(title).not.toBeNull();
    fireEvent.change(url!, { target: { value: 'url' } });
    fireEvent.change(title!, { target: { value: 'title' } });
    expect(setEditPic).toHaveBeenCalledTimes(2);
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
});
