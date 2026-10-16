import type { ContextType } from 'react';
import { render } from '@testing-library/react';
import commonUtils from 'src/lib/commonUtils';
import { Event } from 'src/containers/Event';
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

describe('Event container', () => {
  it('calls setTitleAndScroll with event title when present', () => {
    const spy = vi.spyOn(commonUtils, 'setTitleAndScroll');
    const value = makeMockContext({
      content: {
        homePage: { title: '', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
        eventPage: {
          title: 'Blood Drive',
          type: 'eventPageContent',
          _id: 'event-1',
          comments: '',
          enabled: true,
        },
      },
    });
    render(
      <ContentContext.Provider value={value}>
        <Event />
      </ContentContext.Provider>,
    );
    expect(spy).toHaveBeenCalledWith('Blood Drive', window.screen.width);
  });

  it('calls setTitleAndScroll with default Event when title is empty', () => {
    const spy = vi.spyOn(commonUtils, 'setTitleAndScroll');
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
        <Event />
      </ContentContext.Provider>,
    );
    expect(spy).toHaveBeenCalledWith('Event', window.screen.width);
  });
});
