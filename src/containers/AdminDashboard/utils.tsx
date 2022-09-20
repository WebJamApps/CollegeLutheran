import superagent from 'superagent';
import Fetch from '../../lib/fetch';

async function createBook(data: any, auth:any): Promise<string> {
  if (data.type === '') data.type = 'otherPics';
  try {
    const res = await Fetch.fetchPost(superagent, auth, data);
    if (res.status === 201) {
      window.location.reload();
      return `${res.status}`;
    }
  } catch (e) { return `${(e as Error).message}`; }
  return 'Did not create book';
}

export default { createBook };
