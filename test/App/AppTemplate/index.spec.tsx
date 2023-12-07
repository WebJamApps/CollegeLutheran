/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  handleEscapePress, handleKeyMenu, toggleMobileMenu, AppTemplate, makeDrawerClass,
} from 'src/App/AppTemplate';

describe('AppTemplate', () => {
  it('is defined', () => {
    expect(AppTemplate).toBeDefined();
  });
  it('toggleMobileMenu', () => {
    const setMenuOpen = jest.fn();
    const menuOpen = true;
    toggleMobileMenu(menuOpen, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
  it('handleKeyMenu', () => {
    const setMenuOpen = jest.fn();
    const e = { key: 'Enter' };
    const menuOpen = true;
    handleKeyMenu(e, menuOpen, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
  it('handleEscapePress', () => {
    const e = { key: 'Enter' };
    const setMenuOpen = jest.fn();
    handleEscapePress(e, setMenuOpen);
    expect(setMenuOpen).not.toHaveBeenCalled();
  });
  it('makeDrawerClass when menuOpen', () => {
    expect(makeDrawerClass(true)).toBe('home-sidebar open drawer-container');
  });
  it('handleEscapePress to close menu', () => {
    const e = { key: 'Escape' };
    const setMenuOpen = jest.fn();
    handleEscapePress(e, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
});
