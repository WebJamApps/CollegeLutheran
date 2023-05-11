import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import axios from 'axios';
import { Ibook, Icontent, makeGetter } from './utils';

export const populateContent = async (setContent: (arg0:Icontent)=> void) => {
  try {
    const { data: homePage } = await axios.get(`${process.env.BackendUrl}/book/one?type=homePageContent`);
    const { data: youthPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=youthPageContent`);
    const { data: habitatPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=habitatPageContent`);
    const { data: newsPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=Forum`);
    setContent({
      homePage,
      youthPage,
      habitatPage,
      newsPage,
    });
  } catch (err) {
    console.log((err as Error).message);
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
      newsPage: {} as Ibook,
    });
  }
};

export function setContentDef(_arg0: Icontent) {}

export const ContentContext = createContext({
  content: {
    homePage: {} as Ibook,
    youthPage: {} as Ibook,
    habitatPage: {} as Ibook,
    newsPage: {} as Ibook,
  },
  setContent: setContentDef,
  getContent: () => Promise.resolve(),
});

  type ContentProps = { children: ReactNode };
export function ContentProvider({ children }: ContentProps): JSX.Element {
  const { Provider } = ContentContext;
  const [content, setContent] = useState({} as Icontent);
  const getContent = makeGetter(setContent, populateContent);
  useEffect(() => {
    // eslint-disable-next-line no-void
    void populateContent(setContent);
  }, []);

  return (
    <Provider value={{
      setContent, content, getContent,
    }}
    >
      {children}
    </Provider>
  );
}
