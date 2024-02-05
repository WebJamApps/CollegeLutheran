import {
  populateContent, ContentProvider, setContentDef, populatePictures, setPicturesDef, setNewsDef, populateNews,
} from 'src/providers/Content.provider';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('Content provider', () => {
  it('renders the ContentProvider', () => {
    const contentProvider = renderer.create(<ContentProvider><div /></ContentProvider>).toJSON();
    expect(contentProvider).toBeDefined();
  });
  it('sets content with useEffect', async () => {
    render(<ContentProvider><div id="test-div">Test Div Here</div></ContentProvider>);
    expect(screen.getByText('Test Div Here')).toBeInTheDocument();
  });
  it('setContentDef', () => {
    const Icontent: any = {};
    expect(setContentDef(Icontent)).toBeUndefined();
  });
  it('populates content catches error', async () => {
    let content: any;
    const setContent = jest.fn((c) => { content = c; });
    await populateContent(setContent);
    expect(content.habitatPage.type).toBe('habitatPageContent');
  });
  it('populates content', async () => {
    const setContent = jest.fn();
    const resp = {
      data: {
        homePage:
       { title: '', type: '', _id: '' },
        youthPage: { title: '', type: '', _id: '' },
        habitatPage: { title: '', type: '', _id: '' },
      },
    };
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));
    await populateContent(setContent);
    expect(setContent).toHaveBeenCalled();
  });
  it('populates pictures', async () => {
    const setPictures = jest.fn();
    const resp = {
      data: {
        musicPics:
           { title: '', type: '', _id: '' },
        familyPics: { title: '', type: '', _id: '' },
        habitatPics: { title: '', type: '', _id: '' },
        youthPics: { title: '', type: '', _id: '' },
        otherPics: { title: '', type: '', _id: '' },
      },
    };
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));
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
    (axios.get as jest.Mock).mockResolvedValue({ data });
    const setNews = jest.fn();
    await populateNews(setNews);
    expect(setNews).toHaveBeenCalledWith({ newsContent: data });
  });
});
