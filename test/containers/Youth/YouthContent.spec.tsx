import { render } from '@testing-library/react';
import { YouthContent } from 'src/containers/Youth/YouthContent';

describe('YouthContent', () => {
  it('renders the youth page', () => {
    const result: any = render(<YouthContent />).container;
    expect(result).toMatchSnapshot();
  });
});
