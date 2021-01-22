/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Youth } from '../../src/containers/Youth/index';
import DefaultYouthContent from '../../src/containers/Youth/YouthContent';
import PicSlider from '../../src/components/PicSlider';

const youthContent: any = {};

function setup(data: any[]) {
  let wrapper: any;
  if (data !== null && data !== undefined) {
    wrapper = shallow(<Youth youthPics={data} youthContent={youthContent} />);
  } else wrapper = shallow(<Youth youthContent={youthContent} />);
  return { wrapper };
}

describe('Youth', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Youth youthPics={[]} youthContent={youthContent} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders the Youth component', () => {
    const data = [{}];
    const { wrapper } = setup(data);
    expect(wrapper.find(DefaultYouthContent).exists()).toBe(true);
    expect(wrapper.find(DefaultYouthContent).dive().find('div.page-content').exists()).toBe(true);
  });
  it('renders with images', () => new Promise<void>((done) => {
    const data:any[] = [{
      title: '', type: '', _id: '', created_at: '',
    }];
    const wrapper2 = shallow(<DefaultYouthContent youthPics={data} youthContent={youthContent} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
    done();
  }));
});
