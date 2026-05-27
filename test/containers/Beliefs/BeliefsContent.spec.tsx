import { render } from '@testing-library/react';
import BeliefsContent from 'src/containers/Beliefs/BeliefsContent';

describe('BeliefsContent', () => {
  it('renders the beliefs page', () => {
    const result: any = render(<BeliefsContent />).container;
    expect(result).toMatchSnapshot();
  });
});
