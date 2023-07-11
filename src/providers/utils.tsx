export interface IpictureTypes {
  musicPics: Ibook[];
  familyPics: Ibook[];
  youthPics: Ibook[];
  habitatPics: Ibook[];
  otherPics: Ibook[];
}

export interface Ibook {
  link?: string;
  caption?: string;
  modify?: JSX.Element;
  thumbnail?: string;
  title: string;
  _id: string;
  type: string;
  created_at?: string;
  author?: string;
  numberPages?: number;
  dateOfPub?: number;
  url?: string;
  isbn?: string;
  siteLocation?: string;
  numberOfCopies?: number;
  access?: string;
  comments?: string;
  checkedOutBy?: string;
  checkedOutByName?: string;
}

export interface Icontent {
  homePage: Ibook;
  youthPage: Ibook;
  habitatPage: Ibook;
  stewardshipPage: Ibook;
}

export interface Inews {
  newsContent: Ibook[];
}

export function makeGetter(
  setter: (arg0: any) => void,
  populate: (args: {
    (value: any): void;
  },
  ) => void,
) {
  return async () => populate(setter);
}
