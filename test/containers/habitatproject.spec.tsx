
import HabitatProject from '../../src/containers/HabitatProject/index';
import HabitatProjectContent from '../../src/containers/HabitatProject/HabitatProjectContent';
import React from 'react';
import renderer from 'react-test-renderer';
  
describe('Habitat Project', () => {
  it('Renders the Habitat Project page', () => {
    const page = renderer.create(<HabitatProject/>).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  it('Renders DefaultHabitatContent', () => {
    const page = renderer.create(<DefaultHabitatContent/>).toJSON();
    expect(page).toMatchSnapshot();
  });
});
