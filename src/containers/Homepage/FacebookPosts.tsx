import { useEffect, useState } from 'react';

// Cards rendered from web-jam-back's cached Graph API feed
// (GET /facebook/feed), replacing the unreliable Page Plugin iframe
// (CollegeLutheran#740 / web-jam-back#797). Mirrors the LiveStream component's
// fetch-then-fall-back-to-a-link pattern.
export interface FbPost {
  id?: string;
  message?: string;
  full_picture?: string;
  permalink_url?: string;
  created_time?: string;
}
interface FeedResponse { posts: FbPost[]; lastUpdated: string | null }

const PAGE_URL = 'https://www.facebook.com/CollegeLutheranChurch/';
// Don't show a feed that hasn't refreshed in a week — better a clean link than
// stale-looking content (the backend stops updating during a token outage).
const STALE_MS = 7 * 24 * 60 * 60 * 1000;

export interface FacebookPostsProps { maxWidth?: number; maxHeight?: number; testId?: string }

export const FacebookPosts = ({ maxWidth = 500, maxHeight = 485, testId }: FacebookPostsProps) => {
  const [posts, setPosts] = useState<FbPost[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch(`${process.env.BackendUrl}/facebook/feed`);
        const data = await res.json() as FeedResponse;
        const fresh = !!data.lastUpdated && Date.now() - new Date(data.lastUpdated).getTime() < STALE_MS;
        if (active && fresh && Array.isArray(data.posts)) { setPosts(data.posts); setLastUpdated(data.lastUpdated); }
      } catch { /* leave posts empty → the page-link fallback renders below */ }
    };
    void load();
    return () => { active = false; };
  }, []);

  // Empty, failed, or stale → render nothing. The "Like Us On Facebook" header
  // that sits above this component in both feeds is already the page link, so a
  // fallback link here would just duplicate it.
  if (posts.length === 0) return null;
  return (
    <>
      <div
        className="fbFeed"
        data-testid={testId}
        style={{
          maxWidth: `${maxWidth}px`, margin: 'auto', maxHeight: `${maxHeight}px`, overflowY: 'auto', textAlign: 'left',
        }}
      >
        {posts.map((post) => (
          <a
            key={post.id || post.permalink_url}
            className="fbPost"
            href={post.permalink_url || PAGE_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '10px',
            }}
          >
            {post.full_picture ? (
              <img src={post.full_picture} alt="" style={{ width: '100%', borderRadius: '4px', marginBottom: '6px' }} />
            ) : null}
            {post.message ? <p style={{ fontSize: '10pt', margin: '0 0 4px' }}>{post.message}</p> : null}
            {post.created_time ? (
              <span style={{ fontSize: '8pt', color: '#666' }}>
                {new Date(post.created_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            ) : null}
          </a>
        ))}
      </div>
      {lastUpdated ? (
        <p className="fbUpdated" style={{ fontSize: '8pt', color: '#666', textAlign: 'center', margin: '4px 0 0' }}>
          {`Feed updated ${new Date(lastUpdated).toLocaleString()}`}
        </p>
      ) : null}
    </>
  );
};

export default FacebookPosts;
