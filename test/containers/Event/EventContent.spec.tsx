/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventContent from 'src/containers/Event/EventContent';
import { ContentContext } from 'src/providers/Content.provider';

const renderWith = (title?: string, comments?: string) => {
  const value: any = {
    content: {
      eventPage: {
        title,
        _id: 'event-id',
        type: 'eventPageContent',
        comments,
        enabled: true,
      },
    },
  };
  return render(
    <ContentContext.Provider value={value}>
      <EventContent />
    </ContentContext.Provider>,
  );
};

describe('EventContent', () => {
  it('renders heading with event title and parsed body comments', () => {
    renderWith('Blood Drive', '<p>Sign up to donate blood</p>');
    expect(screen.getByText('Blood Drive')).toBeInTheDocument();
    expect(screen.getByText('Sign up to donate blood')).toBeInTheDocument();
  });

  it('renders without crashing when eventPage is empty or comments are missing', () => {
    const value: any = { content: { eventPage: null } };
    render(
      <ContentContext.Provider value={value}>
        <EventContent />
      </ContentContext.Provider>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');
  });
});
