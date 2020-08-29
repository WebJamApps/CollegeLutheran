/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import { Family } from '../../src/containers/Family/index';
import DefaultFamilyContent from '../../src/containers/Family/FamilyContent';
import PicSlider from '../../src/components/PicSlider';

function setup(data: any[]) {
  let wrapper: ShallowWrapper<any, Readonly<any>, React.Component<any, any, any>>;
  if (data !== null && data !== undefined) {
    wrapper = shallow(<Family familyPics={data} />);
  } else wrapper = shallow(<Family />);
  return { wrapper };
}

describe('Family', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Family familyPics={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders the Family component', () => {
    const data = [{}];
    const { wrapper } = setup(data);
    expect(wrapper.find(DefaultFamilyContent).exists()).toBe(true);
    expect(wrapper.find(DefaultFamilyContent).dive().find('div.page-content').exists()).toBe(true);
  });
  it('renders with images', () => new Promise((done) => {
    const data:any[] = [{
      title: '', type: '', _id: '', created_at: '',
    }];
    const wrapper2 = shallow(<DefaultFamilyContent familyPics={data} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
    done();
  }));
});
