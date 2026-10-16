import {
  ContinueMenuItem, MakeLink, checkIsAllowed, setBulletin, sortBulletins, SideMenuItem,
} from 'src/App/AppTemplate/SideMenuItem';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ContentContext } from 'src/providers/Content.provider';

const mockLocation = { pathname: '/staff' };

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));
interface IMockLinkProps {
  to: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

vi.mock('react-router-dom', () => ({
  useLocation: () => mockLocation,
  Link: ({
    to, children, onClick, className,
  }: IMockLinkProps) => (
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

const mockContentContext: Partial<React.ContextType<typeof ContentContext>> = {
  news: { newsContent: [] },
  getNews: vi.fn(),
  content: {
    homePage: {
      title: '', _id: '', type: '', comments: '',
    },
    youthPage: {
      title: '', _id: '', type: '', comments: '',
    },
    habitatPage: {
      title: '', _id: '', type: '', comments: '',
    },
    stewardshipPage: {
      title: '', _id: '', type: '', comments: '',
    },
    headerLineContent: null,
    eventPage: null,
  },
  setContent: vi.fn(),
  getContent: vi.fn(),
  pictures: {
    musicPics: [],
    familyPics: [],
    youthPics: [],
    habitatPics: [],
    otherPics: [],
  },
  setPictures: vi.fn(),
  getPictures: vi.fn(),
  setHeaderLine: vi.fn(),
  getHeaderLine: vi.fn(),
};

const renderWithProviders = (ui: React.ReactElement) => render(
  <GoogleOAuthProvider clientId="">
    <ContentContext.Provider value={mockContentContext as React.ContextType<typeof ContentContext>}>
      {ui}
    </ContentContext.Provider>
  </GoogleOAuthProvider>,
);

describe('SideMenuItem', () => {
  beforeEach(() => {
    mockLocation.pathname = '/staff';
  });

  it('sorts bulletins in order', () => {
    const bulletins = [{
      type: '1', _id: 'a', title: 'b1', created_at: '2023-05-16T10:30:00Z',
    },
    {
      type: '3', _id: 'c', title: 'b3', created_at: '2023-07-16T10:30:00Z',
    },
    {
      type: '2', _id: 'b', title: 'b2', created_at: '2023-06-16T10:30:00Z',
    }];
    sortBulletins(bulletins);
    expect(bulletins[0]._id).toBe('c');
    expect(bulletins[1]._id).toBe('b');
    expect(bulletins[2]._id).toBe('a');
  });
  it('sets bulletins', () => {
    const mItem = {
      classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const books = [
      { comments: 'worshipbulletin', url: 'https://example.com/bulletin1' },
      { comments: 'worshipbulletin', url: 'https://example.com/bulletin2' },
    ];
    const newMItem = setBulletin(mItem, books);
    expect(newMItem.link).toBe('https://example.com/bulletin1');
  });
  it('sets link to empty string when no bulletins', () => {
    const mItem = {
      classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const books = [
      { comments: 'worshipbulletin' },
      { comments: 'worshipbulletin' },
    ];
    const result = setBulletin(mItem, books);
    expect(result.link).toBe('');
  });
  it('shows login button when on staff page and not already authenticated', () => {
    const props = {
      menu: {
        classname: '', type: 'googleLogin', iconClass: '', link: '', name: '',
      },
      index: 1,
      auth: {
        isAuthenticated: false,
        error: '',
        token: '',
        user: {
          userType: '',
          email: '',
        },
      },
      pathname: '/staff',
      handleClose: vi.fn(),
    };
    const { container } = render(<GoogleOAuthProvider clientId=""><ContinueMenuItem {...props} /></GoogleOAuthProvider>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
  it('shows logout button when authenticated', () => {
    const props = {
      menu: {
        classname: '', type: 'googleLogout', iconClass: '', link: '', name: '',
      },
      index: 1,
      auth: {
        isAuthenticated: true,
        error: '',
        token: '',
        user: {
          userType: '',
          email: '',
        },
      },
      pathname: '',
      handleClose: vi.fn(),
    };
    const { container } = render(<GoogleOAuthProvider clientId=""><ContinueMenuItem {...props} /></GoogleOAuthProvider>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
  it('renders anchor when type is not link', () => {
    const menu = {
      classname: '', type: '', iconClass: '', link: '/some-url', name: '', text: 'nav-link',
    };
    const index = 0;
    const type = '';
    const handleClose = vi.fn();
    const { container } = render(<MakeLink menu={menu} index={index} type={type} handleClose={handleClose} />);
    expect(container).toMatchSnapshot();
  });
  it('returns null when path and menu link are staff', () => {
    const menu = {
      auth: true, classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const auth = {
      isAuthenticated: true, user: { userType: 'admin', email: '' }, error: '', token: '',
    };
    const userRoles = ['', ''];
    const result = checkIsAllowed(menu, auth, userRoles);
    expect(result).toBe(false);
  });
  it('renders a collapsed group and toggles open/closed on click', () => {
    mockLocation.pathname = '/';
    const groupMenu = {
      classname: 'about-us',
      type: 'group',
      iconClass: 'fas fa-church',
      link: '',
      name: 'About Us',
      children: [
        {
          classname: '',
          type: 'link',
          iconClass: 'fas fa-arrows-alt',
          link: '/belief',
          name: 'Our Lutheran Beliefs',
        },
        {
          classname: '',
          type: 'link',
          iconClass: 'fas fa-landmark',
          link: '/history',
          name: 'History',
        },
      ],
    };
    const handleClose = vi.fn();
    renderWithProviders(<SideMenuItem menu={groupMenu} index={0} handleClose={handleClose} />);

    const button = screen.getByRole('button', { name: 'About Us' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'menu-group-about-us');

    const controlledList = document.getElementById('menu-group-about-us');
    expect(controlledList).toBeInTheDocument();
    expect(controlledList).toHaveAttribute('hidden');

    // Click to expand
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(controlledList).not.toHaveAttribute('hidden');
    expect(screen.getByText('Our Lutheran Beliefs')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(controlledList).toHaveAttribute('hidden');
  });
  it('automatically opens a group when it holds the current page', () => {
    mockLocation.pathname = '/staff';
    const groupMenu = {
      classname: 'people-ministries',
      type: 'group',
      iconClass: 'fas fa-users',
      link: '',
      name: 'People & Ministries',
      children: [
        {
          classname: '',
          type: 'link',
          iconClass: 'fas fa-users',
          link: '/staff',
          name: 'Church Staff',
        },
        {
          classname: '',
          type: 'link',
          iconClass: 'fas fa-music',
          link: '/music',
          name: 'Music',
        },
      ],
    };
    const handleClose = vi.fn();
    renderWithProviders(<SideMenuItem menu={groupMenu} index={0} handleClose={handleClose} />);

    const button = screen.getByRole('button', { name: 'People & Ministries' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    const controlledList = document.getElementById('menu-group-people-ministries');
    expect(controlledList).not.toHaveAttribute('hidden');
  });
  it('stops click propagation when clicking a group toggle button', () => {
    const groupMenu = {
      classname: 'about-us',
      type: 'group',
      iconClass: 'fas fa-church',
      link: '',
      name: 'About Us',
      children: [
        {
          classname: '', type: 'link', iconClass: '', link: '/belief', name: 'Our Lutheran Beliefs',
        },
      ],
    };
    const parentClick = vi.fn();
    const handleClose = vi.fn();
    renderWithProviders(
      <div onClick={parentClick} role="presentation">
        <SideMenuItem menu={groupMenu} index={0} handleClose={handleClose} />
      </div>,
    );

    const button = screen.getByRole('button', { name: 'About Us' });
    fireEvent.click(button);
    expect(parentClick).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });
  it('calls handleClose when a sub-item page link is clicked', () => {
    const groupMenu = {
      classname: 'about-us',
      type: 'group',
      iconClass: 'fas fa-church',
      link: '',
      name: 'About Us',
      children: [
        {
          classname: '', type: 'link', iconClass: 'fas fa-landmark', link: '/history', name: 'History',
        },
      ],
    };
    const handleClose = vi.fn();
    renderWithProviders(<SideMenuItem menu={groupMenu} index={0} handleClose={handleClose} />);

    const button = screen.getByRole('button', { name: 'About Us' });
    fireEvent.click(button);

    const link = screen.getByRole('link', { name: /History/i });
    fireEvent.click(link);
    expect(handleClose).toHaveBeenCalled();
  });
  it('hides the event menu item when event is off or empty', () => {
    const eventMenuItem = {
      classname: '', type: 'link', iconClass: 'fas fa-star', link: '/event', name: 'Event',
    };
    const { container } = renderWithProviders(<SideMenuItem menu={eventMenuItem} index={0} handleClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('shows the event menu item with its configured title when event is enabled', () => {
    const customContext = {
      ...mockContentContext,
      content: {
        ...mockContentContext.content!,
        eventPage: {
          title: 'Blood Drive',
          comments: '',
          type: 'eventPageContent',
          _id: 'e1',
          enabled: true,
        },
      },
    };
    const eventMenuItem = {
      classname: '', type: 'link', iconClass: 'fas fa-star', link: '/event', name: 'Event',
    };
    render(
      <GoogleOAuthProvider clientId="">
        <ContentContext.Provider value={customContext as any}>
          <SideMenuItem menu={eventMenuItem} index={0} handleClose={vi.fn()} />
        </ContentContext.Provider>
      </GoogleOAuthProvider>,
    );
    const link = screen.getByRole('link', { name: /Blood Drive/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/event');
  });
  it('hides the event menu item while event is loading', () => {
    const customContext = {
      ...mockContentContext,
      eventLoading: true,
      content: {
        ...mockContentContext.content!,
        eventPage: {
          title: 'Blood Drive',
          comments: '',
          type: 'eventPageContent',
          _id: 'e1',
          enabled: true,
        },
      },
    };
    const eventMenuItem = {
      classname: '', type: 'link', iconClass: 'fas fa-star', link: '/event', name: 'Event',
    };
    const { container } = render(
      <GoogleOAuthProvider clientId="">
        <ContentContext.Provider value={customContext as any}>
          <SideMenuItem menu={eventMenuItem} index={0} handleClose={vi.fn()} />
        </ContentContext.Provider>
      </GoogleOAuthProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

