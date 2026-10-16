/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { act, useState, type ContextType } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import type { Ibook } from 'src/providers/utils';
import {
  ButtonsNav,
  ChangeEventPageSect,
  ChangeHeaderLine, ChangeHomePageSect, ChangeNewsPage, ChangeYouthPageSect, makeHandleChange, ReconnectFacebook,
} from 'src/containers/AdminDashboard/AdminDashboardContent';
import utils from 'src/containers/AdminDashboard/utils';
import { CommentsEditor, UpdateButton } from 'src/containers/AdminDashboard/ChangePageSection';
import { ContentContext } from 'src/providers/Content.provider';

describe('AdminDashboard Content', () => {
  it('saves the event page with name and content via ChangeEventPageSect', () => {
    utils.putAPI = vi.fn();
    const { getByLabelText, getByRole } = render(<ChangeEventPageSect />);
    const nameInput = getByLabelText('Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Blood Drive' } });

    fireEvent.click(getByRole('button', { name: 'Update Event Page' }));
    expect(utils.putAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Blood Drive',
        type: 'eventPageContent',
      }),
      expect.anything(),
      expect.any(Function),
      true,
    );
  });
  it('saves the plain header line with an 80-character limit', () => {
    utils.putAPI = vi.fn();
    const { getByLabelText, getByRole } = render(<ChangeHeaderLine />);
    const input = getByLabelText('Header line') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Worship Service Every Sunday at 10 am' } });

    expect(input.maxLength).toBe(80);
    fireEvent.click(getByRole('button', { name: 'Update Header line' }));
    expect(utils.putAPI).toHaveBeenCalledWith(
      { title: 'Worship Service Every Sunday at 10 am', comments: '', type: 'headerLineContent' },
      expect.anything(),
      expect.any(Function),
      true,
    );
  });
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
    const title = container.querySelector('input[aria-label="Title"]') as HTMLInputElement | null;
    expect(title).not.toBeNull();
    fireEvent.change(title!, { target: { value: 'somethin' } });
  });
  it('handles setUrl for ChangeNewsPage', () => {
    const { container } = render(<ChangeNewsPage />);
    const url = container.querySelector('input[aria-label="Url"]') as HTMLInputElement | null;
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
  it('preserves dirty drafts across unrelated content updates', () => {
    const initialEvent: Ibook = {
      _id: 'event-1',
      title: 'Saved event',
      comments: '<p>Saved comments</p>',
      type: 'eventPageContent',
      enabled: true,
    };
    type ContentState = ContextType<typeof ContentContext>['content'];
    let setContentFn!: (val: ContentState) => void;
    function Wrapper({ children }: { children: React.ReactNode }) {
      const [contextContent, setContextContent] = useState<ContentState>({
        eventPage: initialEvent,
        homePage: { title: 'Initial Home', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
      });
      setContentFn = setContextContent;
      const contextValue: Partial<ContextType<typeof ContentContext>> = {
        content: contextContent,
      };
      return (
        <ContentContext.Provider value={contextValue as ContextType<typeof ContentContext>}>
          {children}
        </ContentContext.Provider>
      );
    }
    const { getByLabelText, container } = render(
      <Wrapper>
        <ChangeEventPageSect />
      </Wrapper>,
    );
    const nameInput = getByLabelText('Name') as HTMLInputElement;
    expect(nameInput.value).toBe('Saved event');

    fireEvent.change(nameInput, { target: { value: 'Unsaved draft' } });
    expect(nameInput.value).toBe('Unsaved draft');

    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Unsaved comments draft' } });
    expect(textarea.value).toBe('Unsaved comments draft');

    act(() => {
      setContentFn({
        eventPage: initialEvent,
        homePage: { title: 'Updated Home without event change', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
      });
    });

    expect(nameInput.value).toBe('Unsaved draft');
    expect(textarea.value).toBe('Unsaved comments draft');
  });
});
