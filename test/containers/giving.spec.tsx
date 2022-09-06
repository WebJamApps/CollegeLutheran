import React from 'react';
import { Giving } from '../../src/containers/Giving/index';
import renderer from 'react-test-renderer';

describe('Giving', () => {
  it('Renders the Giving component', () => {
    const giving = renderer.create(<Giving/>).toJSON();
    expect(giving).toMatchSnapshot();
  });
});
 