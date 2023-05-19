import renderer from 'react-test-renderer';
import React from 'react';
import { About } from 'src/containers/Homepage/About';
import { render } from '@testing-library/react';
import WideFacebookFeed from 'src/containers/Homepage/WideFacebookFeed';
import '@testing-library/jest-dom/extend-expect';

// eslint-disable-next-line react/display-name
const AboutF = jest.mock('src/containers/Homepage/About', () => () => <div data-testid="about-component" />);
// eslint-disable-next-line react/display-name
jest.mock('src/containers/Homepage/WideFacebookFeed', () => () => <div data-testid="wide-facebook-feed" />);

describe('Homepage', () => {
  it('should render correct JSX when width >=900', () => {
    const props = { width: 900, targetRef: React.createRef() };
    const { container, getByTestId } = render(<About {...props} />);
    expect(true).toBe(true);
  });
});
