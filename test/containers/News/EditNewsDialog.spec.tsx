/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from '@testing-library/react';
import {
  EditNewsDialog, NewsTextField, EditNewsContent, EditNewsButtons,
} from 'src/containers/News/EditNewsDialog';
import utils, { defaultNews } from 'src/containers/News/utilsN';

describe('EditNewsDialog', () => {
  it('renders NewsTextField', () => {
    const props = {
      value: '', label: '', onChange: vi.fn(), className: '',
    };
    const { container } = render(<NewsTextField {...props} />);
    expect(container.querySelector('input')).not.toBeNull();
  });
  it('renders EditNewsDialog with editNews', () => {
    const editNews = {
      title: '', type: 'Forum', comments: '', url: '', _id: '',
    };
    const setEditNews = vi.fn();
    const { container } = render(<EditNewsDialog editNews={editNews} setEditNews={setEditNews} />);
    expect(container.querySelector('.editNewsDialog')).not.toBeNull();
  });
  it('renders EditNewsContent and handles input changes', () => {
    const setEditNews = vi.fn();
    const props = {
      showHideCaption: vi.fn(),
      editNewsState: { editNews: defaultNews, setEditNews },
    };
    const { container } = render(<EditNewsContent {...props} />);
    const urlInput = container.querySelector('input[label="* URL"]') as HTMLInputElement | null;
    const titleInput = container.querySelector('input[label="* Title"]') as HTMLInputElement | null;
    expect(urlInput).not.toBeNull();
    expect(titleInput).not.toBeNull();
    fireEvent.change(urlInput!, { target: { value: 'url' } });
    fireEvent.change(titleInput!, { target: { value: 'title' } });
    expect(setEditNews).toHaveBeenCalledTimes(2);
  });
  it('renders EditNewsButtons and handles events', () => {
    utils.newsApi = vi.fn();
    const props = {
      editNews: { ...defaultNews, title: 't', url: 'u' },
      setEditNews: vi.fn(),
    };
    const { container } = render(<EditNewsButtons {...props} />);
    const update = container.querySelector('.updateNewsButton') as HTMLButtonElement | null;
    const del = container.querySelector('.deleteNewsButton') as HTMLButtonElement | null;
    const cancel = container.querySelector('.cancelNewsButton') as HTMLButtonElement | null;
    fireEvent.click(update!);
    expect(utils.newsApi).toHaveBeenCalled();
    fireEvent.click(del!);
    expect(utils.newsApi).toHaveBeenCalledTimes(2);
    fireEvent.click(cancel!);
    expect(props.setEditNews).toHaveBeenCalled();
  });
});
