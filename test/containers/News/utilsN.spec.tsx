import axios from 'axios';
import utilsN from 'src/containers/News/utilsN';

vi.mock('axios');

describe('news utils', () => {
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
    const getNews = vi.fn();
    const setEditNews = vi.fn();
    const err = new Error('error');
    vi.mocked(axios.request).mockRejectedValue(err);
    const config = {
      url: `${process.env.BackendUrl}/book/${editNews._id}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: editNews,
    };
    await utilsN.performAxiosRequest(config, getNews, setEditNews);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith(config);
  });
});
