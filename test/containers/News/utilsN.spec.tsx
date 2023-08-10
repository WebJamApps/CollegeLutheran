import axios from 'axios';
import utilsN, { deleteNews, performAxiosRequest } from 'src/containers/News/utilsN';

jest.mock('axios');

describe('news utils', () => {
  it('updates news content', async () => {
    const editNews = {
      title: '', comments: '', type: '', url: '', _id: '',
    };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const getNews = jest.fn();
    const setEditNews = jest.fn();
    (axios.request as jest.Mock).mockResolvedValueOnce({ status: 200 });
    await utilsN.updateNews(editNews, auth, getNews, setEditNews);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/${editNews._id}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: editNews,
    });
  });
  it('deletes news content', async () => {
    const editNews = {
      title: '', comments: '', type: '', url: '', _id: '',
    };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const getNews = jest.fn();
    const setEditNews = jest.fn();
    (axios.request as jest.Mock).mockResolvedValueOnce({ data: 'news deleted' });
    await deleteNews(editNews, getNews, auth, setEditNews);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/${editNews._id}`,
      method: 'delete',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: editNews,
    });
  });
  it('catches error for update and delete', async () => {
    const editNews = {
      title: '', comments: '', type: '', url: '', _id: '',
    };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const url = `${process.env.BackendUrl}/book/${editNews._id}`;
    const method = 'put';
    const getNews = jest.fn();
    const setEditNews = jest.fn();
    const err = new Error('error');
    (axios.request as jest.Mock).mockRejectedValue(err);
    await performAxiosRequest(method, url, editNews, auth, getNews, setEditNews);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/${editNews._id}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: editNews,
    });
  });
  it('handles event for makeShowHideBulletin', () => {
    let checked: any;
    const evt = { target: { checked } };
    const news = {
      title: '', type: 'Forum', comments: '', url: '', _id: '',
    };
    const setNews = jest.fn();
    const handler = utilsN.makeShowHideBulletin(setNews, news);
    handler(evt);
    expect(setNews).toHaveBeenCalled();
  });
  it('handles event for makeShowHideBulletin when checked is true', () => {
    const evt = { target: { checked: true } };
    const setNews = jest.fn();
    const news = {
      title: '', type: 'Forum', url: '', comments: 'worshipbulletin', _id: '',
    };
    const handler = utilsN.makeShowHideBulletin(setNews, news);
    handler(evt);
    expect(news.comments).toBe('worshipbulletin');
  });
});
