import type { Ipicture, PictureContext } from 'src/Providers/PicsProvider';

export interface Iauth {
  isAuthenticated: boolean,
  error: string,
  email: string,
  token: string,
  user: {
    userType?: string;
  };
}

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

export interface Store {
  auth: Iauth;
  youthContent: { youthContent: Ibook };
  homeContent: { homeContent: Ibook };
  books: { books: Ibook[] };
  showTable: { showTable: boolean };
}

const mapStoreToProps = (store: Store): Record<string, unknown> => ({
  auth: store.auth,
  homeContent: store.homeContent.homeContent,
  youthContent: store.youthContent.youthContent,
  books: store.books.books,
  showTable: store.showTable.showTable,
});
export default mapStoreToProps;
