/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import commonUtils from 'src/lib/commonUtils';
import { Event } from 'src/containers/Event';
import { ContentContext } from 'src/providers/Content.provider';

describe('Event container', () => {
  it('calls setTitleAndScroll with event title when present', () => {
    const spy = vi.spyOn(commonUtils, 'setTitleAndScroll');
    const value: any = {
      content: {
        eventPage: {
          title: 'Blood Drive',
          type: 'eventPageContent',
          _id: 'event-1',
          comments: '',
          enabled: true,
        },
      },
    };
    render(
      <ContentContext.Provider value={value}>
        <Event />
      </ContentContext.Provider>,
    );
    expect(spy).toHaveBeenCalledWith('Blood Drive', window.screen.width);
  });

  it('calls setTitleAndScroll with default Event when title is empty', () => {
    const spy = vi.spyOn(commonUtils, 'setTitleAndScroll');
    const value: any = { content: { eventPage: null } };
    render(
      <ContentContext.Provider value={value}>
        <Event />
      </ContentContext.Provider>,
    );
    expect(spy).toHaveBeenCalledWith('Event', window.screen.width);
  });
});
