import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import axios from 'axios';
import type { Ibook } from 'src/redux/mapStoreToProps';

export interface Icontent {
  homePage: Ibook,
  youthPage: Ibook,
  habitatPage: Ibook
}

const populateContent = async (setContent: (arg0:Icontent)=> void) => {
  const { data: homePage } = await axios.get(`${process.env.BackendUrl}/book/one?type=homePageContent`);
  const { data: youthPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=youthPageContent`);
  const { data: habitatPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=habitatPageContent`);
  setContent({ homePage, youthPage, habitatPage });
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
