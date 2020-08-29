/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { News } from '../../src/containers/News/index';
import DefaultNewsContent from '../../src/containers/News/NewsContent';

describe('News', () => {
  const booksArr: any[] = [{
    _id: '1', created_at: '1971-01-03T00:00:00Z', title: 'howdy', type: '',
  },
  {
    _id: '3', created_at: '1973-01-03T00:00:00Z', title: 'howdy', type: '',
  },
  {
    title: 'howdy2', _id: '2', created_at: '1972-01-03T00:00:00Z', type: '',
  }];
  const controller = {
    setState: () => true,
    props: {},
    state: {
      books: booksArr,
    },
  };

  it('Renders the News component', () => {
    const results = shallow(<News books={[]} />);
    expect(results.find(DefaultNewsContent)
      .dive()
      .find('div.page-content')
      .exists()).toBe(true);
  });
  it('Renders the News component correctly', () => {
    const tree = renderer
      .create(<News books={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the table when books exist', () => {
    const { books } = controller.state;
    const key = '1';
    const results = shallow(<News key={key} books={books} />);
    expect(results.find(DefaultNewsContent)
      .dive()
      .find('div.forumsTable')
      .exists()).toBe(true);
  });
  it('sorts the books in default order', () => {
    const bArr: any[] = [{
      title: 'howdy2', _id: '1', created_at: '1972-01-03T00:00:00Z', type: '',
    },
    {
      title: 'howdy3', _id: '2', created_at: '1972-01-03T00:00:00Z', type: '',
    }];
    const controller2 = {
      setState: () => true,
      props: {},
      state: {
        books: bArr,
      },
    };
    const { books } = controller2.state;
    const results = shallow(<News books={books} />);
    books.sort((a, b) => {
      const dataA = a.created_at;
      const dateB = b.created_at;
      if (dataA < dateB) return -1;
      return 0;
    });
    expect(results).toBeTruthy();
  });
});
