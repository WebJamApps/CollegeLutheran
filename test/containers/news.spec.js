import React from 'react';
import { shallow } from 'enzyme';
import { News } from '../../src/containers/News/index';
import DefaultNewsContent from '../../src/containers/News/NewsContent';

describe('News', () => {
  const controller = {
    setState: () => true,
    props: {},
    state: { books: [{ _id: '1', created_at: '1971-01-03T00:00:00Z' }, { _id: '2', created_at: '1972-01-03T00:00:00Z' }] },
  };

  it('Renders the News component', () => {
    const results = shallow(<News />);
    expect(results.find(DefaultNewsContent)
      .dive()
      .find('div.page-content')
      .exists()).toBe(true);
  });
  it('renders the table when books exist', () => {
    const { books, _id } = controller.state;
    const results = shallow(<News key={_id} books={books} />);
    expect(results.find(DefaultNewsContent)
      .dive()
      .find('div.forumsTable')
      .exists()).toBe(true);
  });
});
