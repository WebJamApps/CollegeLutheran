import { createContext, ReactChild, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import fetch from 'src/lib/fetch';
import axios from 'axios';

export interface Ipicture {
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

export interface IpictureTypes {
  musicPics: Ipicture[], familyPics: Ipicture[], youthPics: Ipicture[], habitatPics: Ipicture[], otherPics: Ipicture[],
}

async function populatePictures(this: any, setPictures: any) {
  // call set pictures with array of objects, use this.fetch but use axios instead of superagent **use try catch for fetch calls
  // const buildAxiosFetch = await axios.fetch
  if (setPictures.type === '') setPictures.type = ['musicPics', 'familyPics', 'youthPics', 'habitatPics', 'otherPics'];
  try {
    this.fetch.fetchGet(axios, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
    this.fetch.fetchGet(axios, 'book/one?type=youthPageContent', 'GOT_YOUTHPAGE');
    this.fetch.fetchGet(axios, 'book?type=familyPics', 'GOT_FAMILYPICS');
    this.fetch.fetchGet(axios, 'book?type=Forum', 'GOT_BOOKS');
    this.fetch.fetchGet(axios, 'book?type=youthPics', 'GOT_YOUTHPICS');
    this.fetch.fetchGet(axios, 'book?type=otherPics&type=habitat', 'GOT_OTHERPICS');
    this.fetch.fetchGet(axios, 'book?type=musicPics', 'GOT_MUSICPICS');
  } catch (error) {
    console.log(error);
  }
}

const usePictureState: (arg0: IpictureTypes) =>
[IpictureTypes, (arg0: IpictureTypes) => void] = createPersistedState('pictures', sessionStorage);

export const PictureContext = createContext({
  pictures: {
    musicPics: [], familyPics: [], youthPics: [], habitatPics: [], otherPics: [],
  },
  setPictures: () => { },
  getPictures: () => Promise.resolve(),
});

type Props = { children: ReactChild };
export function PictureProvider({ children }: Props): JSX.Element {
  const { Provider } = PictureContext;
  const [pictures, setPictures] = usePictureState({
    musicPics: [], familyPics: [], youthPics: [], habitatPics: [], otherPics: [],
  });

  useEffect(() => {
    (async () => {
      await populatePictures(setPictures);
    })();
  }, []);

  return (
    <Provider value={{
      getPictures, setPictures, pictures,
    }}
    >
      {children}
    </Provider>
  );
}
