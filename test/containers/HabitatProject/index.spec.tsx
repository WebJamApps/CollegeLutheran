import renderer from 'react-test-renderer';
import HabitatProject from 'src/containers/HabitatProject/index';
import DefaultHabitatContent from 'src/containers/HabitatProject/HabitatProjectContent';

describe('Habitat Project', () => {
  it('Renders the Habitat Project page', () => {
    const page = renderer.create(<HabitatProject />).toJSON();
    expect(page).toMatchSnapshot();
  });

  it('Renders DefaultHabitatContent', () => {
    const page = renderer.create(<DefaultHabitatContent />).toJSON();
    expect(page).toMatchSnapshot();
  });
});