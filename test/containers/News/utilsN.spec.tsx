import axios from 'axios';
import utilsN from 'src/containers/News/utilsN';

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
});
