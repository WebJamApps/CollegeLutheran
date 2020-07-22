export interface Auth {
  isAuthenticated: boolean,
  error: string,
  email: string,
  token: string,
  user: {
    userType?: string;
  };
}

export interface Ibook {
  title: string,
  _id: string,
  type: string,
  created_at: string,
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
  auth: Auth;
  homeContent: { homeContent: Ibook };
  familyPics: { familyPics: Ibook[] };
  youthPics: { youthPics: Ibook[] };
  books: { books: Ibook[] };
  otherPics: { otherPics: Ibook[], editPic: Ibook };
  showTable: { showTable: boolean };
}

const mapStoreToProps = (store: Store): any => ({
  auth: store.auth,
  homeContent: store.homeContent.homeContent,
  familyPics: store.familyPics.familyPics,
  youthPics: store.youthPics.youthPics,
  books: store.books.books,
  otherPics: store.otherPics.otherPics,
  editPic: store.otherPics.editPic,
  showTable: store.showTable.showTable,
});
export default mapStoreToProps;
