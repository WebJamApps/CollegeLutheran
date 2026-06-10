import { render, screen, waitFor } from '@testing-library/react';
import { FacebookPosts } from 'src/containers/Homepage/FacebookPosts';

const okJson = (data: unknown) => Promise.resolve({ ok: true, json: () => Promise.resolve(data) });
const recent = new Date().toISOString();

describe('FacebookPosts', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('renders cards from a fresh feed', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({
      lastUpdated: recent,
      posts: [
        {
          id: 'p1',
          message: 'Sunday service at 10am',
          permalink_url: 'https://fb/p1',
          created_time: '2026-06-01T00:00:00Z',
          full_picture: 'https://img/1.jpg',
        },
        { id: 'p2', message: 'Bible study Wednesday' },
      ],
    })));
    const { container } = render(<FacebookPosts />);
    await screen.findByText('Sunday service at 10am');
    expect(container.querySelectorAll('.fbPost')).toHaveLength(2);
    const first = container.querySelector('.fbPost') as HTMLAnchorElement;
    expect(first.getAttribute('href')).toBe('https://fb/p1');
    expect(container.querySelector('img')?.getAttribute('src')).toBe('https://img/1.jpg');
  });

  it('renders the page-link fallback when the feed is empty', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({ lastUpdated: recent, posts: [] })));
    render(<FacebookPosts />);
    const link = await screen.findByText('Visit us on Facebook');
    expect(link.getAttribute('href')).toBe('https://www.facebook.com/CollegeLutheranChurch/');
  });

  it('renders the fallback when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no network'))));
    const { container } = render(<FacebookPosts />);
    await screen.findByText('Visit us on Facebook');
    expect(container.querySelector('.fbFeedFallback')).not.toBeNull();
  });

  it('renders the fallback (no cards) when the cached feed is stale', async () => {
    const old = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    vi.stubGlobal('fetch', vi.fn(() => okJson({ lastUpdated: old, posts: [{ id: 'p1', message: 'stale' }] })));
    const { container } = render(<FacebookPosts />);
    await screen.findByText('Visit us on Facebook');
    await waitFor(() => expect(container.querySelector('.fbPost')).toBeNull());
  });
});
