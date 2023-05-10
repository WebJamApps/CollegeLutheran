import {
  populateContent, ContentProvider, setContentDef,
} from 'src/providers/Content.provider';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('Content provider', () => {
  it('renders the ContentProvider', () => {
    const contentProvider = renderer.create(<ContentProvider><div /></ContentProvider>).toJSON();
    expect(contentProvider).toBeDefined();
  });
  it('sets content with useEffect', async () => {
    render(<ContentProvider><div id="test-div">Test Div Here</div></ContentProvider>);
    expect(screen.getByText('Test Div Here')).toBeInTheDocument();
  });
  it('setContentDef', () => {
    const Icontent: any = {};
    expect(setContentDef(Icontent)).toBeUndefined();
  });
  it('populates content catches error', async () => {
    let content: any;
    const setContent = jest.fn((c) => { content = c; });
    await populateContent(setContent);
    expect(content.habitatPage.type).toBe('habitatPageContent');
  });
  it('populates content', async () => {
    const setContent = jest.fn();
    const resp = {
      data: {
        homePage:
       { title: '', type: '', _id: '' },
        youthPage: { title: '', type: '', _id: '' },
        habitatPage: { title: '', type: '', _id: '' },
      },
    };
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));
    await populateContent(setContent);
    expect(setContent).toHaveBeenCalled();
  });
});
