import renderer from 'react-test-renderer';
import { NewsTextField } from 'src/containers/News/EditNewsDialog';

describe('EditNewsDialog', () => {
  it('renders NewsTextField', () => {
    const props = { value: '', label: '', onChange: jest.fn() };
    const result: any = renderer.create(<NewsTextField {...props} />).toJSON();
    expect(result.type).toBe('div');
  });
});
