import { handleKeyPress } from 'src/App/AppTemplate/DrawerContainer';

it('closes the mobile menu on clicking escape key', () => {
  const setMenuItem = jest.fn();
  handleKeyPress({ key: 'Escape' }, setMenuItem);
  expect(setMenuItem).toHaveBeenCalledWith(false);
});
