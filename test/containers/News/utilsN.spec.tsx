import utilsN from 'src/containers/News/utilsN';

describe('news utils', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('catches error for update and delete', async () => {
    const editNews = {
      title: '', comments: '', type: '', url: '', _id: '',
    };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: { userType: 'string', email: 'string' },
    };
    const getNews = vi.fn();
    const setEditNews = vi.fn();
    const fetchMock = vi.fn(() => Promise.reject(new Error('error')));
    vi.stubGlobal('fetch', fetchMock);
    const url = `${process.env.BackendUrl}/book/${editNews._id}`;
    const init: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editNews),
    };
    await utilsN.performFetchRequest(url, init, getNews, setEditNews);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, init);
  });
});
