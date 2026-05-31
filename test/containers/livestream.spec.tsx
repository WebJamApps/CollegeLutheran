import { render, screen, waitFor } from '@testing-library/react';
import { LiveStream } from 'src/containers/LiveStream/index';

const okJson = (data: unknown) => Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

describe('LiveStream', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('embeds the video from /livestream/current on widescreen', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({ videoId: 'VID123', status: 'live' })));
    render(<LiveStream width={950} />);
    const frame = await screen.findByTitle('Live Stream Wide');
    expect(frame.getAttribute('src')).toBe('https://www.youtube.com/embed/VID123');
  });

  it('embeds the video on small screens', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({ videoId: 'VID123', status: 'completed' })));
    render(<LiveStream width={400} />);
    const frame = await screen.findByTitle('Live Stream Small');
    expect(frame.getAttribute('src')).toBe('https://www.youtube.com/embed/VID123');
  });

  it('shows only the fallback links (no iframe) when status is none', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({ videoId: null, status: 'none' })));
    render(<LiveStream width={950} />);
    await screen.findByText('YouTube Live'); // links always render
    await waitFor(() => expect(screen.queryByTitle('Live Stream Wide')).toBeNull());
  });

  it('falls back to links when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no network'))));
    render(<LiveStream width={400} />);
    await screen.findByText('Facebook Videos');
    await waitFor(() => expect(screen.queryByTitle('Live Stream Small')).toBeNull());
  });

  it('labels a live stream as "Live now"', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({ videoId: 'VID123', status: 'live' })));
    render(<LiveStream width={950} />);
    expect((await screen.findByTestId('stream-label')).textContent).toBe('Live now');
  });

  it('labels a completed stream with its date', async () => {
    vi.stubGlobal('fetch', vi.fn(() => okJson({ videoId: 'VID123', status: 'completed', publishedAt: '2026-05-25T15:00:00Z' })));
    render(<LiveStream width={950} />);
    expect((await screen.findByTestId('stream-label')).textContent).toContain('May 25, 2026');
  });
});
