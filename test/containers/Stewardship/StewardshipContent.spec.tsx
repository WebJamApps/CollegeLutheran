/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import StewardshipContent from 'src/containers/Stewardship/StewardshipContent';
import { ContentContext } from 'src/providers/Content.provider';

const renderWith = (comments?: string) => {
  const value: any = {
    content: { stewardshipPage: { title: '', _id: '', type: 'stewardshipPageContent', comments } },
  };
  return render(
    <ContentContext.Provider value={value}><StewardshipContent /></ContentContext.Provider>,
  );
};

describe('StewardshipContent', () => {
  it('keeps the fixed title and graphic', () => {
    renderWith();
    expect(screen.getByText('Stewardship')).toBeTruthy();
    expect(screen.getByAltText('fall stewardship')).toBeTruthy();
  });
  it('renders the admin-editable body from stewardshipPage.comments', () => {
    renderWith('<p>Give generously this fall</p>');
    expect(screen.getByText('Give generously this fall')).toBeTruthy();
  });
});
