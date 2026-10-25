import type { ContextType } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { showAdminDashboard, checkIsAdmin, App } from 'src/App';
import store from 'src/redux/store';
import { CollegeLutheranThemeProvider } from 'src/App/theme';
import { ContentContext } from 'src/providers/Content.provider';

type ContentContextType = ContextType<typeof ContentContext>;

const makeMockContentContext = (overrides?: Partial<ContentContextType>): ContentContextType => ({
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

function LocationProbe() {
  return <div data-testid="location">{useLocation().pathname}</div>;
}

const renderAppOnRoute = (contextValue: ContentContextType, route = '/event') => render(
  <GoogleOAuthProvider clientId="test-client-id">
    <Provider store={store.store}>
      <CollegeLutheranThemeProvider>
        <ContentContext.Provider value={contextValue}>
          <MemoryRouter initialEntries={[route]}>
            <App />
            <LocationProbe />
          </MemoryRouter>
        </ContentContext.Provider>
      </CollegeLutheranThemeProvider>
    </Provider>
  </GoogleOAuthProvider>,
);

describe('App component', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it('showAdminDashboard when isAdmin', () => {
    const result = showAdminDashboard(true);
    expect(result).not.toBeNull();
  });
  it('checkIsAdmin', () => {
    const setIsAdmin = vi.fn();
    process.env.userRoles = JSON.stringify({ roles: ['tester'] });
    checkIsAdmin({
      error: '', token: 'token', isAuthenticated: true, user: { userType: 'tester', email: 'tester@tesing.com' },
    }, setIsAdmin);
    expect(setIsAdmin).toHaveBeenCalledWith(true);
  });

  it('retains /event route and does not render home when event is loading', () => {
    const context = makeMockContentContext({
      eventLoading: true,
      content: {
        homePage: { title: 'Welcome Home', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
        eventPage: null,
      },
    });
    const { container } = renderAppOnRoute(context, '/event');
    expect(screen.queryByText('Welcome Home')).not.toBeInTheDocument();
    expect(container.querySelector('.page-content')).not.toBeNull();
  });

  it('renders Event component when eventLoading is false and event is enabled', () => {
    const context = makeMockContentContext({
      eventLoading: false,
      content: {
        homePage: { title: 'Welcome Home', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
        eventPage: {
          title: 'Blood Drive',
          comments: '<p>Donate now</p>',
          enabled: true,
          type: 'eventPageContent',
          _id: 'e1',
        },
      },
    });
    renderAppOnRoute(context, '/event');
    expect(screen.getByRole('heading', { name: 'Blood Drive' })).toBeInTheDocument();
  });

  it('redirects to home when eventLoading is false and event is not enabled', () => {
    const context = makeMockContentContext({
      eventLoading: false,
      content: {
        homePage: { title: 'Welcome Home', _id: '', type: 'homePageContent' },
        youthPage: { title: '', _id: '', type: 'youthPageContent' },
        habitatPage: { title: '', _id: '', type: 'habitatPageContent' },
        stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent' },
        headerLineContent: null,
        eventPage: {
          title: 'Blood Drive',
          comments: '<p>Donate now</p>',
          enabled: false,
          type: 'eventPageContent',
          _id: 'e1',
        },
      },
    });
    renderAppOnRoute(context, '/event');
    expect(screen.queryByRole('heading', { name: 'Blood Drive' })).not.toBeInTheDocument();
  });

  it('retains /stewardship route and does not render home while content is loading', () => {
    const context = makeMockContentContext({
      content: {} as ContentContextType['content'],
    });
    renderAppOnRoute(context, '/stewardship');
    expect(screen.getByTestId('location')).toHaveTextContent('/stewardship');
    expect(screen.queryByRole('heading', { name: 'Stewardship' })).not.toBeInTheDocument();
  });

  it('renders Stewardship on a direct visit once content loads with it enabled', () => {
    const base = makeMockContentContext();
    const context = makeMockContentContext({
      content: {
        ...base.content,
        stewardshipPage: {
          title: '', _id: 's1', type: 'stewardshipPageContent', enabled: true,
        },
      },
    });
    renderAppOnRoute(context, '/stewardship');
    expect(screen.getByRole('heading', { name: 'Stewardship' })).toBeInTheDocument();
  });

  it('redirects /stewardship to home when content has loaded and it is not enabled', () => {
    renderAppOnRoute(makeMockContentContext(), '/stewardship');
    expect(screen.getByTestId('location').textContent).toBe('/');
    expect(screen.queryByRole('heading', { name: 'Stewardship' })).not.toBeInTheDocument();
  });
});
