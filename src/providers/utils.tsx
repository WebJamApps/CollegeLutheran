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
  modify?: unknown;
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
  enabled?: boolean;
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

// Seasonal Stewardship page is visible only when an admin has toggled its
// content doc's `enabled` flag on; absent/false = hidden. (CollegeLutheran#707)
export const stewardshipEnabled = (
  content?: { stewardshipPage?: Ibook },
): boolean => content?.stewardshipPage?.enabled === true;
