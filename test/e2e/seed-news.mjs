/* global process, console */
// Seeds / removes News (type:"Forum") rows in the test MongoDB for the news-table
// e2e. Used by the CircleCI e2e job: `seed` before the run, `cleanup` after
// (always). Connects with MONGO_DB_URI (the TEST db — never prod).
//
// The test DB is SHARED, so concurrent CI builds (e.g. a batch of Dependabot
// PRs) would otherwise clobber each other: one build's cleanup `deleteMany`
// would delete every build's rows, leaving a sibling build with an empty table.
// To isolate runs, every row is tagged with a per-run E2E_SEED_TAG (the CircleCI
// build number in CI; `local` otherwise) baked into both the marker and the
// titles. Cleanup deletes only this run's marker, and the spec looks up this
// run's titles — so concurrent builds never interfere. Keep this title format in
// sync with seededTitle() in news-table.spec.ts.
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_DB_URI;
export const TAG = process.env.E2E_SEED_TAG || 'local';
const MARKER = `E2E_NEWS_SEED_${TAG}`;
// Enough rows that the News table must scroll, so the e2e also exercises
// overflow/scrolling on both desktop and mobile.
const COUNT = 15;

const seededTitle = (i) => `E2E ${TAG} News Item ${String(i + 1).padStart(2, '0')}`;

async function run() {
  const mode = process.argv[2];
  if (!uri) { console.error('MONGO_DB_URI is not set'); process.exit(1); }
  if (mode !== 'seed' && mode !== 'cleanup') {
    console.error('usage: node seed-news.mjs seed|cleanup');
    process.exit(1);
  }
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const books = client.db().collection('books');
    if (mode === 'seed') {
      const now = Date.now();
      const docs = Array.from({ length: COUNT }, (_, i) => ({
        type: 'Forum',
        seedMarker: MARKER,
        title: seededTitle(i),
        url: 'https://www.collegelutheran.org/',
        created_at: new Date(now - i * 86_400_000).toISOString(),
      }));
      await books.insertMany(docs);
      console.log(`seeded ${docs.length} Forum news rows (tag ${TAG})`);
    } else {
      const res = await books.deleteMany({ seedMarker: MARKER });
      console.log(`removed ${res.deletedCount} seeded rows (tag ${TAG})`);
    }
  } finally {
    await client.close();
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
