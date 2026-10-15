/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  handleEscapePress, handleKeyMenu, toggleMobileMenu, AppTemplate, makeDrawerClass,
} from 'src/App/AppTemplate';
import { HeaderSection } from 'src/App/AppTemplate/HeaderSection';
import { ContentContext } from 'src/providers/Content.provider';

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
      if (this.classList.contains('theme-mode-selector')) return new DOMRect(900, 0, 200, 50);
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

  it('centers a fitting desktop line between the title block and theme selector', () => {
    const { container } = render(<HeaderWithLine title="  Sunday worship  " />);

    const line = screen.getByText('Sunday worship');
    expect(line).toHaveClass('header-line-inline');
    expect(line).not.toHaveClass('header-line-under');
    expect(line).toHaveStyle({ left: '630px' });
    expect(container.querySelector('#header')).not.toHaveClass('has-under-line');
  });

  it('moves an overflowing desktop line under the subtitle and expands the header', () => {
    lineWidth = 600;
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

    lineWidth = 600;
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
