import React from 'react';
import HabitatProject from '../../src/containers/HabitatProject/index';
import DefaultHabitatContent from '../../src/containers/HabitatProject/HabitatProjectContent';
import { shallow } from 'enzyme';

function setup() {
    const props = {};
    const wrapper = shallow(<HabitatProject />);
    return {  props, wrapper };
  }
  
  describe('Habitat Project', () => {
    it('Renders the Habitat Project component', () => {
      const { wrapper } = setup();
      expect(wrapper.find(DefaultHabitatContent)
        .dive()
        .find('div.page-content')
        .exists()).toBe(true);
    });
  });

