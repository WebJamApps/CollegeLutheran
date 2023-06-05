import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import axios, { AxiosError } from 'axios';
import {
  Ibook, Icontent, IpictureTypes, makeGetter,
} from './utils';

export const populateContent = async (setContent: (arg0:Icontent)=> void) => {
  try {
    const { data: homePage } = await axios.get(`${process.env.BackendUrl}/book/one?type=homePageContent`);
    const { data: youthPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=youthPageContent`);
    const { data: habitatPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=habitatPageContent`);
    const { data: stewardshipPage } = await axios.get(`${process.env.BackendUrl}/book/one?type=stewardshipPageContent`);
    setContent({
      homePage,
      youthPage,
      habitatPage,
      stewardshipPage,
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
      stewardshipPage: {} as Ibook,
    });
  }
};

export const populatePictures = async (setPictures: (arg0:IpictureTypes)=> void) => {
  try {
    const { data: musicPics } = await axios.get(`${process.env.BackendUrl}/book?type=musicPics`);
    const { data: familyPics } = await axios.get(`${process.env.BackendUrl}/book?type=familyPics`);
    const { data: youthPics } = await axios.get(`${process.env.BackendUrl}/book?type=youthPics`);
    const { data: habitatPics } = await axios.get(`${process.env.BackendUrl}/book?type=habitatPics`);
    const { data: otherPics } = await axios.get(`${process.env.BackendUrl}/book?type=otherPics`);
    const pictures = {
      musicPics, familyPics, youthPics, habitatPics, otherPics,
    };
    setPictures(pictures);
  } catch (err) { console.log((err as AxiosError).message); }
};

export function setContentDef(_arg0: Icontent) {}
export function setPicturesDef(_arg0: IpictureTypes) {}

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
  setContent: setContentDef,
  getContent: () => Promise.resolve(),
  setPictures: setPicturesDef,
  getPictures: () => Promise.resolve(),
});

  type ContentProps = { children: ReactNode };
export function ContentProvider({ children }: ContentProps): JSX.Element {
  const { Provider } = ContentContext;
  const [content, setContent] = useState({} as Icontent);
  const [pictures, setPictures] = useState({} as IpictureTypes);

  const getContent = makeGetter(setContent, populateContent);
  const getPictures = makeGetter(setPictures, populatePictures);
  useEffect(() => {
    // eslint-disable-next-line no-void
    void populateContent(setContent);
    // eslint-disable-next-line no-void
    void populatePictures(setPictures);
  }, []);

  return (
    <Provider value={{
      setContent, content, getContent, pictures, setPictures, getPictures,
    }}
    >
      {children}
    </Provider>
  );
}
