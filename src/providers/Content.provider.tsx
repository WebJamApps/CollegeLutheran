import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import axios from 'axios';
import type { Ibook } from 'src/redux/mapStoreToProps';

export interface Icontent {
  homePage: Ibook,
  youthPage: Ibook
}
export interface IpictureTypes {
  musicPics: Ibook[], familyPics: Ibook[], youthPics: Ibook[],
  habitatPics: Ibook[], otherPics: Ibook[],
}

const populateContent = async (setContent: (arg0:Icontent)=> void, setPictures: (arg0:IpictureTypes)=> void) => {
  const { data: homePage } = await axios.get(`${process.env.BackendUrl}/book/one?type=homePageContent`);
  const { data: youthPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=youthPageContent`);
  const { data: musicPics } = await axios.get(`${process.env.BackendUrl}/book?type=musicPics`);
  const { data: familyPics } = await axios.get(`${process.env.BackendUrl}/book?type=familyPics`);
  const { data: youthPics } = await axios.get(`${process.env.BackendUrl}/book?type=youthPics`);
  const { data: habitatPics } = await axios.get(`${process.env.BackendUrl}/book?type=habitatPics`);
  const { data: otherPics } = await axios.get(`${process.env.BackendUrl}/book?type=otherPics`);
  const pictures = {
    musicPics, familyPics, youthPics, habitatPics, otherPics,
  };
  setPictures(pictures);
  setContent({ homePage, youthPage });
};

export const ContentContext = createContext({
  content: {
    homePage: {} as Ibook,
    youthPage: {} as Ibook,
  },
  pictures: {
    musicPics: [],
    familyPics: [],
    youthPics: [],
    habitatPics: [],
    otherPics: [],
  } as IpictureTypes,
  setPictures: (_arg0: IpictureTypes) => {},
  // getPictures: () => Promise.resolve(),
  setContent: (_arg0: Icontent) => {},
  getContent: () => Promise.resolve(),
});

  type ContentProps = { children: ReactNode };
export function ContentProvider({ children }: ContentProps): JSX.Element {
  const { Provider } = ContentContext;
  const [content, setContent] = useState({} as Icontent);
  const [pictures, setPictures] = useState({} as IpictureTypes);

  const getContent = async () => populateContent(setContent, setPictures);

  useEffect(() => {
    (async () => {
      await populateContent(setContent, setPictures);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider value={{
      setContent, content, getContent, setPictures, pictures,
    }}
    >
      {children}
    </Provider>
  );
}
