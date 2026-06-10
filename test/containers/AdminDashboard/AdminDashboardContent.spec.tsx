/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import {
  ButtonsNav,
  ChangeHomePageSect, ChangeNewsPage, ChangeYouthPageSect, makeHandleChange, ReconnectFacebook,
} from 'src/containers/AdminDashboard/AdminDashboardContent';
import utils from 'src/containers/AdminDashboard/utils';
import { CommentsEditor, UpdateButton } from 'src/containers/AdminDashboard/ChangePageSection';

describe('AdminDashboard Content', () => {
  it('renders the update button', () => {
    utils.putAPI = vi.fn();
    const props = {
      title: '', comments: 'comments', buttonName: '', type: 'habitatPageContent' as any, getContent: vi.fn(),
    };
    const { container } = render(<UpdateButton {...props} />);
    const btn = container.querySelector('#c-h') as HTMLButtonElement | null;
    expect(btn).not.toBeNull();
    fireEvent.click(btn!);
    expect(utils.putAPI).toHaveBeenCalled();
  });
  it('handles setComments on CommentsEditor', () => {
    const setComments = vi.fn();
    const { container } = render(<CommentsEditor setComments={setComments} comments="test" />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement | null;
    expect(textarea).not.toBeNull();
    fireEvent.change(textarea!, { target: { value: 'newComments' } });
    expect(setComments).toHaveBeenCalledWith('newComments');
  });
  it('handles setTitle for ChangeHomepage', () => {
    const { container } = render(<ChangeHomePageSect />);
    const input = container.querySelector('#title') as HTMLInputElement | null;
    expect(input).not.toBeNull();
    fireEvent.change(input!, { target: { value: 'title' } });
  });
  it('handles setTitle for ChangeNewsPage', () => {
    const { container } = render(<ChangeNewsPage />);
    const title = container.querySelector('input[label="Title"]') as HTMLInputElement | null;
    expect(title).not.toBeNull();
    fireEvent.change(title!, { target: { value: 'somethin' } });
  });
  it('handles setUrl for ChangeNewsPage', () => {
    const { container } = render(<ChangeNewsPage />);
    const url = container.querySelector('input[label="Url"]') as HTMLInputElement | null;
    expect(url).not.toBeNull();
    fireEvent.change(url!, { target: { value: 'anythin' } });
  });
  it('makeHandleChange when checked is true', () => {
    const checked = true;
    const evt = { target: { checked } };
    const setComments = vi.fn();
    const handleChange = makeHandleChange(setComments);
    handleChange(evt);
    expect(setComments).toHaveBeenCalledWith('worshipbulletin');
  });
  it('makeHandleChange when checked is false', () => {
    const checked = false;
    const evt = { target: { checked } };
    const setComments = vi.fn();
    const handleChange = makeHandleChange(setComments);
    handleChange(evt);
    expect(setComments).toHaveBeenCalledWith('');
  });
  it('handles onClick for addNewsAPI button', async () => {
    utils.addNewsAPI = vi.fn(() => Promise.resolve());
    const { container } = render(<ChangeNewsPage />);
    const btn = container.querySelector('button[variant="contained"]') as HTMLButtonElement | null;
    expect(btn).not.toBeNull();
    await act(async () => { fireEvent.click(btn!); });
    expect(utils.addNewsAPI).toHaveBeenCalled();
  });
  it('shows a spinner while news is being added', async () => {
    let resolveApi!: () => void;
    utils.addNewsAPI = vi.fn(() => new Promise<void>((resolve) => { resolveApi = resolve; }));
    const { container } = render(<ChangeNewsPage />);
    const btn = container.querySelector('button[variant="contained"]') as HTMLButtonElement;
    expect(container.querySelector('.addNewsSpinner')).toBeNull();
    await act(async () => { fireEvent.click(btn); });
    expect(container.querySelector('.addNewsSpinner')).not.toBeNull();
    await act(async () => { resolveApi(); });
    await waitFor(() => {
      expect(container.querySelector('.addNewsSpinner')).toBeNull();
    });
  });
  it('handles onChange for ChangeYouthPage', () => {
    const { container } = render(<ChangeYouthPageSect />);
    const input = container.querySelector('#title') as HTMLInputElement | null;
    expect(input).not.toBeNull();
    fireEvent.change(input!, { target: { value: 'title' } });
  });
  it('handles onClick events for ButtonsNav', () => {
    const props = { showEditor: 'string', setShowEditor: vi.fn() };
    const { container } = render(<ButtonsNav {...props} />);
    fireEvent.click(container.querySelector('.createPic') as HTMLButtonElement);
    fireEvent.click(container.querySelector('.editPic') as HTMLButtonElement);
    fireEvent.click(container.querySelector('.editContent') as HTMLButtonElement);
    expect(props.setShowEditor).toHaveBeenCalledTimes(3);
  });
  it('loads the FB SDK and reconnects on click', async () => {
    utils.loadFbSdk = vi.fn();
    utils.reconnectFacebookAPI = vi.fn(() => Promise.resolve());
    const { container } = render(<ReconnectFacebook />);
    expect(utils.loadFbSdk).toHaveBeenCalled();
    const btn = container.querySelector('.reconnectFbButton') as HTMLButtonElement;
    expect(btn).not.toBeNull();
    await act(async () => { fireEvent.click(btn); });
    expect(utils.reconnectFacebookAPI).toHaveBeenCalled();
  });
  it('shows a spinner while reconnecting Facebook', async () => {
    utils.loadFbSdk = vi.fn();
    let resolveApi!: () => void;
    utils.reconnectFacebookAPI = vi.fn(() => new Promise<void>((resolve) => { resolveApi = resolve; }));
    const { container } = render(<ReconnectFacebook />);
    const btn = container.querySelector('.reconnectFbButton') as HTMLButtonElement;
    expect(container.querySelector('.reconnectFbSpinner')).toBeNull();
    await act(async () => { fireEvent.click(btn); });
    expect(container.querySelector('.reconnectFbSpinner')).not.toBeNull();
    await act(async () => { resolveApi(); });
    await waitFor(() => {
      expect(container.querySelector('.reconnectFbSpinner')).toBeNull();
    });
  });
});
