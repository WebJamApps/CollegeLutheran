import {
  createContext, ReactNode, SetStateAction, useEffect, useState,
} from 'react';
import axios, { AxiosError } from 'axios';
import type { Ibook } from 'src/providers/Content.provider';

export interface IpictureTypes {
  musicPics: Ibook[], familyPics: Ibook[], youthPics: Ibook[],
  habitatPics: Ibook[], otherPics: Ibook[],
}
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

export function setPicturesDef(_arg0: IpictureTypes) {}

export const PictureContext = createContext({
  pictures: {
    musicPics: [],
    familyPics: [],
    youthPics: [],
    habitatPics: [],
    otherPics: [],
  } as IpictureTypes,
  setPictures: setPicturesDef,
  getPictures: () => Promise.resolve(),
});

export function makeGetPictures(setPictures: { (value: SetStateAction<IpictureTypes>): void; }) {
  return async () => populatePictures(setPictures);
}

type Props = { children: ReactNode };
export function PictureProvider({ children }: Props): JSX.Element {
  const { Provider } = PictureContext;
  const [pictures, setPictures] = useState({} as IpictureTypes);

  const getPictures = makeGetPictures(setPictures);

  useEffect(() => {
    // eslint-disable-next-line no-void
    void populatePictures(setPictures);
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
