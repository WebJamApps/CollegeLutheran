import renderer from 'react-test-renderer';
import HabitatProject from 'src/containers/HabitatProject/index';

describe('Habitat Project', () => {
  it('Renders the Habitat Project page', () => {
    const page: any = renderer.create(<HabitatProject />).toJSON();
    expect(page.children[0].children[0].children[0].children[0]).toBe('CLC Habitat Project');
    expect(page).toMatchSnapshot();
  });
});
