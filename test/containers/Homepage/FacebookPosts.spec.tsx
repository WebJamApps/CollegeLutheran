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
    expect(container.querySelector('.fbUpdated')?.textContent).toMatch(/^Feed updated /);
  });

  it('renders nothing when the feed is empty (the header above is the fallback link)', async () => {
    const fetchMock = vi.fn(() => okJson({ lastUpdated: recent, posts: [] }));
    vi.stubGlobal('fetch', fetchMock);
    const { container } = render(<FacebookPosts />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(container.querySelector('.fbPost')).toBeNull();
    expect(container.textContent).toBe('');
  });

  it('renders nothing when the fetch fails', async () => {
    const fetchMock = vi.fn(() => Promise.reject(new Error('no network')));
    vi.stubGlobal('fetch', fetchMock);
    const { container } = render(<FacebookPosts />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(container.querySelector('.fbPost')).toBeNull();
  });

  it('renders nothing (no cards) when the cached feed is stale', async () => {
    const old = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const fetchMock = vi.fn(() => okJson({ lastUpdated: old, posts: [{ id: 'p1', message: 'stale' }] }));
    vi.stubGlobal('fetch', fetchMock);
    const { container } = render(<FacebookPosts />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(container.querySelector('.fbPost')).toBeNull();
  });
});
