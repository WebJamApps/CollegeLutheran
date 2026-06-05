/* global process, console */
// Seeds / removes News (type:"Forum") rows in the test MongoDB for the news-table
// e2e. Used by the CircleCI e2e job: `seed` before the run, `cleanup` after
// (always). Connects with MONGO_DB_URI (the TEST db — never prod). All seeded
// rows carry a unique marker so cleanup removes exactly what we added.
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_DB_URI;
const MARKER = 'E2E_NEWS_SEED';
// Enough rows that the News table must scroll, so the e2e also exercises
// overflow/scrolling on both desktop and mobile.
const COUNT = 15;

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
        title: `E2E Test News Item ${String(i + 1).padStart(2, '0')}`,
        url: 'https://www.collegelutheran.org/',
        created_at: new Date(now - i * 86_400_000).toISOString(),
      }));
      await books.insertMany(docs);
      console.log(`seeded ${docs.length} Forum news rows`);
    } else {
      const res = await books.deleteMany({ seedMarker: MARKER });
      console.log(`removed ${res.deletedCount} seeded rows`);
    }
  } finally {
    await client.close();
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
