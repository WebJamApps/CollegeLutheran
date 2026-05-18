/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  populateContent, ContentProvider, setContentDef, populatePictures, setPicturesDef, setNewsDef, populateNews,
} from 'src/providers/Content.provider';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const okJson = (data: unknown) => Promise.resolve({
  ok: true,
  status: 200,
  json: () => Promise.resolve(data),
});

describe('Content provider', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('renders the ContentProvider', () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no network'))));
    const contentProvider = renderer.create(<ContentProvider><div /></ContentProvider>).toJSON();
    expect(contentProvider).toBeDefined();
  });
  it('sets content with useEffect', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no network'))));
    render(<ContentProvider><div id="test-div">Test Div Here</div></ContentProvider>);
    expect(screen.getByText('Test Div Here')).toBeInTheDocument();
  });
  it('setContentDef', () => {
    const Icontent: any = {};
    expect(setContentDef(Icontent)).toBeUndefined();
  });
  it('populates content catches error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no network'))));
    let content: any;
    const setContent = vi.fn((c) => { content = c; });
    await populateContent(setContent);
    expect(content.habitatPage.type).toBe('habitatPageContent');
  });
  it('populates content', async () => {
    const data = {
      homePage: { title: '', type: '', _id: '' },
      youthPage: { title: '', type: '', _id: '' },
      habitatPage: { title: '', type: '', _id: '' },
    };
    vi.stubGlobal('fetch', vi.fn(() => okJson(data)));
    const setContent = vi.fn();
    await populateContent(setContent);
    expect(setContent).toHaveBeenCalled();
  });
  it('populates pictures', async () => {
    const data = {
      musicPics: { title: '', type: '', _id: '' },
      familyPics: { title: '', type: '', _id: '' },
      habitatPics: { title: '', type: '', _id: '' },
      youthPics: { title: '', type: '', _id: '' },
      otherPics: { title: '', type: '', _id: '' },
    };
    vi.stubGlobal('fetch', vi.fn(() => okJson(data)));
    const setPictures = vi.fn();
    await populatePictures(setPictures);
    expect(setPictures).toHaveBeenCalled();
  });
  it('setPicturesDef', () => {
    const IpictureTypes: any = {};
    expect(setPicturesDef(IpictureTypes)).toBeUndefined();
  });
  it('setNewsDef', () => {
    const Inews: any = {};
    expect(setNewsDef(Inews)).toBeUndefined();
  });
  it('sorts news items', async () => {
    const data = [{
      type: '1', _id: 'a', title: 'b1', created_at: '2023-05-16T10:30:00Z',
    },
    {
      type: '3', _id: 'c', title: 'b3', created_at: '2023-07-16T10:30:00Z',
    },
    {
      type: '2', _id: 'b', title: 'b2', created_at: '2023-06-16T10:30:00Z',
    }];
    vi.stubGlobal('fetch', vi.fn(() => okJson(data)));
    const setNews = vi.fn();
    await populateNews(setNews);
    expect(setNews).toHaveBeenCalledWith({ newsContent: data });
  });
});
