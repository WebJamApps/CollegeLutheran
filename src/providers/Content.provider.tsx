import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import {
  Ibook, Icontent, Inews, IpictureTypes, makeGetter,
} from './utils';

async function fetchJson<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const populateContent = async (setContent: (arg0: Icontent) => void) => {
  try {
    const homePage = await fetchJson<Ibook>(`${process.env.BackendUrl}/book/one?type=homePageContent`);
    const youthPage = await fetchJson<Ibook>(`${process.env.BackendUrl}/book/one?type=youthPageContent`);
    const habitatPage = await fetchJson<Ibook>(`${process.env.BackendUrl}/book/one?type=habitatPageContent`);
    const stewardshipPage = await fetchJson<Ibook>(`${process.env.BackendUrl}/book/one?type=stewardshipPageContent`);
    setContent({
      homePage,
      youthPage,
      habitatPage,
      stewardshipPage,
    });
  } catch (err) {
    console.error((err as Error).message);
    const habitatPage = {
      title: '',
      _id: '',
      type: 'habitatPageContent',
      comments: '',
    };

    setContent({
      homePage: {} as Ibook,
      youthPage: {} as Ibook,
      habitatPage,
      stewardshipPage: {} as Ibook,
    });
  }
};

export const populatePictures = async (setPictures: (arg0: IpictureTypes) => void) => {
  try {
    const musicPics = await fetchJson<Ibook[]>(`${process.env.BackendUrl}/book?type=musicPics`);
    const familyPics = await fetchJson<Ibook[]>(`${process.env.BackendUrl}/book?type=familyPics`);
    const youthPics = await fetchJson<Ibook[]>(`${process.env.BackendUrl}/book?type=youthPics`);
    const habitatPics = await fetchJson<Ibook[]>(`${process.env.BackendUrl}/book?type=habitatPics`);
    const otherPics = await fetchJson<Ibook[]>(`${process.env.BackendUrl}/book?type=otherPics`);
    const pictures = {
      musicPics, familyPics, youthPics, habitatPics, otherPics,
    };
    setPictures(pictures);
  } catch (err) { console.error((err as Error).message); }
};

export const populateNews = async (setNews: (arg0: Inews) => void) => {
  try {
    const data = await fetchJson<Ibook[]>(`${process.env.BackendUrl}/book?type=Forum`);
    if (Array.isArray(data)) {
      data.sort((a, b) => {
        if (a.created_at && b.created_at) {
          const dataA = a.created_at.split('T')[0];
          const dateB = b.created_at.split('T')[0];
          if (dataA < dateB) return 1;
          if (dataA > dateB) return -1;
        }
        return 0;
      });
    }
    setNews({ newsContent: data });
  } catch (err) { console.error((err as Error).message); }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setContentDef(_arg0: Icontent) { }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setPicturesDef(_arg0: IpictureTypes) { }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setNewsDef(_arg0: Inews) { }

export const ContentContext = createContext({
  content: {
    homePage: {} as Ibook,
    youthPage: {} as Ibook,
    habitatPage: {} as Ibook,
    stewardshipPage: {} as Ibook,
  },
  pictures: {
    musicPics: [],
    familyPics: [],
    youthPics: [],
    habitatPics: [],
    otherPics: [],
  } as IpictureTypes,
  news: {
    newsContent: [],
  } as Inews,
  setContent: setContentDef,
  getContent: () => Promise.resolve(),
  setPictures: setPicturesDef,
  getPictures: () => Promise.resolve(),
  setNews: setNewsDef,
  getNews: () => Promise.resolve(),
});

type ContentProps = { children: ReactNode };
export function ContentProvider({ children }: ContentProps) {
  const { Provider } = ContentContext;
  const [content, setContent] = useState({} as Icontent);
  const [pictures, setPictures] = useState({} as IpictureTypes);
  const [news, setNews] = useState({} as Inews);

  const getContent = makeGetter(setContent, populateContent);
  const getPictures = makeGetter(setPictures, populatePictures);
  const getNews = makeGetter(setNews, populateNews);
  useEffect(() => {
    // eslint-disable-next-line no-void
    void populateContent(setContent);
    // eslint-disable-next-line no-void
    void populatePictures(setPictures);
    // eslint-disable-next-line no-void
    void populateNews(setNews);
  }, []);

  return (
    <Provider value={{
      setContent, content, getContent, pictures, setPictures, getPictures, news, setNews, getNews,
    }}
    >
      {children}
    </Provider>
  );
}
