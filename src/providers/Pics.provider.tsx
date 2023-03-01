import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import axios from 'axios';
import type { Ibook } from 'src/redux/mapStoreToProps';

export interface IpictureTypes {
  musicPics: Ibook[], familyPics: Ibook[], youthPics: Ibook[],
  habitatPics: Ibook[], otherPics: Ibook[],
}
const populatePictures = async (setPictures: (arg0:IpictureTypes)=> void) => {
  const { data: musicPics } = await axios.get(`${process.env.BackendUrl}/book?type=musicPics`);
  const { data: familyPics } = await axios.get(`${process.env.BackendUrl}/book?type=familyPics`);
  const { data: youthPics } = await axios.get(`${process.env.BackendUrl}/book?type=youthPics`);
  const { data: habitatPics } = await axios.get(`${process.env.BackendUrl}/book?type=habitatPics`);
  const { data: otherPics } = await axios.get(`${process.env.BackendUrl}/book?type=otherPics`);
  const pictures = {
    musicPics, familyPics, youthPics, habitatPics, otherPics,
  };
  setPictures(pictures);
};

export const PictureContext = createContext({
  pictures: {
    musicPics: [],
    familyPics: [],
    youthPics: [],
    habitatPics: [],
    otherPics: [],
  } as IpictureTypes,
  setPictures: (_arg0: IpictureTypes) => {},
  getPictures: () => Promise.resolve(),
});

type Props = { children: ReactNode };
export function PictureProvider({ children }: Props): JSX.Element {
  const { Provider } = PictureContext;
  const [pictures, setPictures] = useState({} as IpictureTypes);

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
