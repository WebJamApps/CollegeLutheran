import { createContext, ReactChild, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
// import fetch from 'src/lib/fetch';
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

const populatePictures = async (setPictures: any) => {
  const { data: musicPics } = await axios.get(`${process.env.BackendUrl}/book?type=musicPics`);
  const pictures = { musicPics };
  // console.log(pictures);
  setPictures(pictures);
};

export interface IpictureTypes {
  musicPics: Ipicture[], familyPics: Ipicture[], youthPics: Ipicture[],
  habitatPics: Ipicture[], otherPics: Ipicture[],
}

const usePictureState: (arg0: IpictureTypes) =>
[IpictureTypes, (arg0: IpictureTypes) => void] = createPersistedState('pictures', sessionStorage);

export const PictureContext = createContext({
  pictures: {} as IpictureTypes,
  setPictures: (_arg0: IpictureTypes) => { },
  getPictures: () => Promise.resolve(),
});

type Props = { children: ReactChild };
export function PictureProvider({ children }: Props): JSX.Element {
  const { Provider } = PictureContext;
  const [pictures, setPictures] = usePictureState({} as IpictureTypes);

  const getPictures = async () => populatePictures(setPictures);

  useEffect(() => {
    (async () => {
      await populatePictures(setPictures);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider value={{
      setPictures, pictures, getPictures,
    }}
    >
      {children}
    </Provider>
  );
}
