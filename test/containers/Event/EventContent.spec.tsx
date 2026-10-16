import type { ContextType } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventContent from 'src/containers/Event/EventContent';
import { ContentContext } from 'src/providers/Content.provider';

type ContentContextType = ContextType<typeof ContentContext>;

const makeMockContext = (overrides?: Partial<ContentContextType>): ContentContextType => ({
  content: {
    homePage: { title: '', _id: '', type: 'homePageContent' },
    youthPage: { title: '', _id: '', type: 'youthPageContent' },
    habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
    stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
    headerLineContent: null,
    eventPage: null,
  },
  eventLoading: false,
  pictures: {
    musicPics: [],
    familyPics: [],
    youthPics: [],
    habitatPics: [],
    otherPics: [],
  },
  news: { newsContent: [] },
  setContent: () => {},
  getContent: () => Promise.resolve(),
  setPictures: () => {},
  getPictures: () => Promise.resolve(),
  setNews: () => {},
  getNews: () => Promise.resolve(),
  setHeaderLine: () => {},
  getHeaderLine: () => Promise.resolve(),
  setEventPage: () => {},
  getEventPage: () => Promise.resolve(),
  ...overrides,
});

const renderWith = (title?: string, comments?: string) => {
  const value = makeMockContext({
    content: {
      homePage: { title: '', _id: '', type: 'homePageContent' },
      youthPage: { title: '', _id: '', type: 'youthPageContent' },
      habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
      stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
      headerLineContent: null,
      eventPage: {
        title: title ?? '',
        _id: 'event-id',
        type: 'eventPageContent',
        comments,
        enabled: true,
      },
    },
  });
  return render(
    <ContentContext.Provider value={value}>
      <EventContent />
    </ContentContext.Provider>,
  );
};

describe('EventContent', () => {
  it('renders heading with event title and parsed body comments', () => {
    renderWith('Blood Drive', '<p>Sign up to donate blood</p>');
    expect(screen.getByText('Blood Drive')).toBeInTheDocument();
    expect(screen.getByText('Sign up to donate blood')).toBeInTheDocument();
  });

  it('renders without crashing when eventPage is empty or comments are missing', () => {
    const value = makeMockContext({
      content: {
        homePage: { title: '', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
        eventPage: null,
      },
    });
    render(
      <ContentContext.Provider value={value}>
        <EventContent />
      </ContentContext.Provider>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');
  });
});
