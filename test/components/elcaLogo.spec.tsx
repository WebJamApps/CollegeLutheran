import React from 'react';
import { shallow } from 'enzyme';
import ELCALogo from '../../src/components/elcaLogo';

function setup() {
  const props = {};
  const pageName = 'sample';
  const wrapper = shallow(<ELCALogo pageName={pageName} />);
  return { wrapper, props, pageName };
}

describe('ELCA', () => {
  it('Renders the ELCA component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.sampleELCA').exists()).toBe(true);
  });
});
