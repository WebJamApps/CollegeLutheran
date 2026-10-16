/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  handleEscapePress, handleKeyMenu, toggleMobileMenu, AppTemplate, makeDrawerClass,
} from 'src/App/AppTemplate';
import { HeaderSection } from 'src/App/AppTemplate/HeaderSection';
import { NavLinks } from 'src/App/AppTemplate/NavLinks';
import { DrawerContainer } from 'src/App/AppTemplate/DrawerContainer';
import { ContentContext } from 'src/providers/Content.provider';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

vi.mock('src/App/AppTemplate/ThemeModeSelector', () => ({
  ThemeModeSelector: () => <div className="theme-mode-selector" />,
}));

function HeaderWithLine({ title }: { title: string | null }) {
  const defaults = useContext(ContentContext);
  const headerLineContent = title === null ? null : { title, _id: 'header-line', type: 'headerLineContent' };
  return (
    <ContentContext.Provider value={{ ...defaults, content: { ...defaults.content, headerLineContent } }}>
      <HeaderSection />
    </ContentContext.Provider>
  );
}

describe('AppTemplate', () => {
  it('is defined', () => {
    expect(AppTemplate).toBeDefined();
  });
  it('toggleMobileMenu', () => {
    const setMenuOpen = vi.fn();
    const menuOpen = true;
    toggleMobileMenu(menuOpen, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
  it('handleKeyMenu', () => {
    const setMenuOpen = vi.fn();
    const e = { key: 'Enter' };
    const menuOpen = true;
    handleKeyMenu(e, menuOpen, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
  it('handleEscapePress', () => {
    const e = { key: 'Enter' };
    const setMenuOpen = vi.fn();
    handleEscapePress(e, setMenuOpen);
    expect(setMenuOpen).not.toHaveBeenCalled();
  });
  it('makeDrawerClass when menuOpen', () => {
    expect(makeDrawerClass(true)).toBe('home-sidebar open drawer-container');
  });
  it('handleEscapePress to close menu', () => {
    const e = { key: 'Escape' };
    const setMenuOpen = vi.fn();
    handleEscapePress(e, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
});

describe('HeaderSection placement', () => {
  const originalWidth = window.innerWidth;
  let lineWidth = 200;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1200 });
    lineWidth = 200;
    vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(() => lineWidth);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function getRect(this: HTMLElement) {
      if (this.id === 'header') return new DOMRect(20, 0, 1160, 100);
      if (this.classList.contains('header-copy')) return new DOMRect(35, 0, 365, 60);
      return new DOMRect();
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.innerWidth = originalWidth;
  });

  it.each([null, '', ' '.repeat(3)])('omits the line and extra header height for %j', (title) => {
    const { container } = render(<HeaderWithLine title={title} />);

    expect(container.querySelector('.header-line')).not.toBeInTheDocument();
    expect(container.querySelector('#header')).not.toHaveClass('has-under-line');
    expect(screen.getByText(/We celebrate God's grace/)).toBeInTheDocument();
  });

  it('centers a fitting desktop line between the title block and header right boundary', () => {
    const { container } = render(<HeaderWithLine title="  Sunday worship  " />);

    const line = screen.getByText('Sunday worship');
    expect(line).toHaveClass('header-line-inline');
    expect(line).not.toHaveClass('header-line-under');
    expect(line).toHaveStyle({ left: '758px' });
    expect(container.querySelector('#header')).not.toHaveClass('has-under-line');
  });

  it('moves an overflowing desktop line under the subtitle and expands the header', () => {
    lineWidth = 800;
    const { container } = render(<HeaderWithLine title="A longer worship announcement" />);

    const line = screen.getByText('A longer worship announcement');
    expect(line).toHaveClass('header-line-under');
    expect(line).not.toHaveClass('header-line-inline');
    expect(line.style.left).toBe('');
    expect(container.querySelector('#header')).toHaveClass('has-under-line');
  });

  it.each([390, 699])('keeps even a fitting line under the subtitle at %ipx', (width) => {
    window.innerWidth = width;
    const { container } = render(<HeaderWithLine title="Sunday worship" />);

    expect(screen.getByText('Sunday worship')).toHaveClass('header-line-under');
    expect(container.querySelector('#header')).toHaveClass('has-under-line');
  });

  it('recalculates both placement directions when the available space changes', () => {
    const { container } = render(<HeaderWithLine title="Sunday worship" />);
    const line = screen.getByText('Sunday worship');
    expect(line).toHaveClass('header-line-inline');

    lineWidth = 800;
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(line).toHaveClass('header-line-under');
    expect(line.style.left).toBe('');
    expect(container.querySelector('#header')).toHaveClass('has-under-line');

    lineWidth = 200;
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(line).toHaveClass('header-line-inline');
    expect(line).not.toHaveClass('header-line-under');
    expect(container.querySelector('#header')).not.toHaveClass('has-under-line');
  });
});

describe('NavLinks and DrawerContainer (side-menu)', () => {
  it('contact panel displays the 4 lines with light blue links, 10pt font, and google maps address link', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <NavLinks handleClose={handleClose} />
      </MemoryRouter>,
    );

    const contactPanel = container.querySelector('.contact-panel');
    expect(contactPanel).toBeInTheDocument();

    expect(contactPanel).toHaveTextContent('210 S. College Ave');
    expect(contactPanel).toHaveTextContent('Salem, VA 24153');
    expect(contactPanel).toHaveTextContent('(540) 389-4963');
    expect(contactPanel).toHaveTextContent('office1@collegelutheran.org');

    expect(contactPanel?.textContent).not.toContain('fax:');
    expect(contactPanel?.textContent).not.toContain('ph:');

    const contactP = contactPanel?.querySelector('p');
    expect(contactP).toHaveStyle({ fontSize: '10pt' });

    const links = contactPanel?.querySelectorAll('a');
    expect(links?.length).toBe(3);

    const addressLink = contactPanel?.querySelector('a');
    expect(addressLink).toBeInTheDocument();
    expect(addressLink).toHaveAttribute(
      'href',
      'https://www.google.com/maps/place/College+Lutheran+Church,+210+S+College+Ave,+Salem,+VA+24153',
    );
    expect(addressLink).toHaveStyle({ color: '#88c1ff', fontSize: '10pt' });
    expect(addressLink).toHaveAttribute('target', '_blank');
    expect(addressLink).toHaveAttribute('rel', 'noopener noreferrer');

    const phoneLink = contactPanel?.querySelector('a[href="tel:5403894963"]');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveStyle({ color: '#88c1ff', fontSize: '10pt' });

    const emailLink = contactPanel?.querySelector('a[href="mailto:office1@collegelutheran.org"]');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveStyle({ color: '#88c1ff', fontSize: '10pt', whiteSpace: 'nowrap' });
  });

  it('renders ThemeModeSelector in NavLinks above the version number', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <NavLinks handleClose={handleClose} />
      </MemoryRouter>,
    );

    const selector = container.querySelector('.theme-mode-selector');
    expect(selector).toBeInTheDocument();
    expect(container.textContent).toContain('Version');
  });

  it('DrawerContainer closes only when clicking the backdrop, leaving drawer open on inner tap', () => {
    const handleClose = vi.fn();
    const handleKeyPress = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <DrawerContainer
          className="home-sidebar open drawer-container"
          handleClose={handleClose}
          handleKeyPress={handleKeyPress}
          menuOpen
        />
      </MemoryRouter>,
    );

    const sidebar = container.querySelector('#sidebar');
    const drawer = container.querySelector('.drawer');
    expect(sidebar).toBeInTheDocument();
    expect(drawer).toBeInTheDocument();

    // Clicking an inner element of the drawer does not trigger handleClose
    if (drawer) {
      fireEvent.click(drawer);
      expect(handleClose).not.toHaveBeenCalled();
    }

    // Clicking the outer backdrop (#sidebar) directly calls handleClose
    if (sidebar) {
      fireEvent.click(sidebar);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });
});

