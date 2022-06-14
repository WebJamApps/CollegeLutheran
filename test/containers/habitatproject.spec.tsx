
import HabitatProject from '../../src/containers/HabitatProject/index';
import DefaultHabitatContent from '../../src/containers/HabitatProject/HabitatProjectContent';
import React from 'react';
import renderer from 'react-test-renderer';
  
describe('Habitat Project', () => {
    it('Renders the Habitat Project page', () => {
        const page = renderer.create(<HabitatProject/>).toJSON()
        expect(page).toMatchSnapshot();
    })
})

describe('Habitat Project', () => {
    it('Renders the Habitat Project page', () => {
        const page = renderer.create(<DefaultHabitatContent/>).toJSON()
        expect(page).toMatchSnapshot();
    })
})
