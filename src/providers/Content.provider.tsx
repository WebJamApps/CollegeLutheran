import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import axios from 'axios';

export interface Ibook {
  link?: string,
  caption?: string,
  modify?: JSX.Element,
  thumbnail?: string,
  title: string,
  _id: string,
  type: string,
  created_at?: string,
  author?: string,
  numberPages?: number,
  dateOfPub?: number,
  url?: string,
  isbn?: string,
  siteLocation?: string,
  numberOfCopies?: number,
  access?: string,
  comments?: string,
  checkedOutBy?: string,
  checkedOutByName?: string,
}

export interface Icontent {
  homePage: Ibook,
  youthPage: Ibook,
  habitatPage: Ibook
}

const populateContent = async (setContent: (arg0:Icontent)=> void) => {
  const { data: homePage } = await axios.get(`${process.env.BackendUrl}/book/one?type=homePageContent`);
  const { data: youthPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=youthPageContent`);
  let habitatPage:Ibook = {} as Ibook;
  try {
    const { data } = await axios.get(`${process.env.BackendUrl}/book/one?type=habitatPageContent`);
    habitatPage = data;
  } catch (err) {
    console.log((err as Error).message);
    habitatPage = {
      title: '',
      _id: '',
      type: 'habitatPageContent',
      comments: '',
    };
  }
  setContent({
    homePage,
    youthPage,
    habitatPage,
  });
};

export const ContentContext = createContext({
  content: {
    homePage: {} as Ibook,
    youthPage: {} as Ibook,
    habitatPage: {} as Ibook,
  },
  setContent: (_arg0: Icontent) => {},
  getContent: () => Promise.resolve(),
});

  type ContentProps = { children: ReactNode };
export function ContentProvider({ children }: ContentProps): JSX.Element {
  const { Provider } = ContentContext;
  const [content, setContent] = useState({} as Icontent);

  const getContent = async () => populateContent(setContent);

  useEffect(() => {
    (async () => {
      await populateContent(setContent);
    })();
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
