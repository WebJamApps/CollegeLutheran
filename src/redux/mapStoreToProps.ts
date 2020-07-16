export interface Book {
  _id: string,
  title: string
  created_at: string
}

export interface IAnyPics {
  title: string,
  type: string,
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

export interface Auth {
  isAuthenticated: boolean,
  error: string,
  email: string,
  token: string,
  user: {
    userType?: string;
  };
}

export interface Store {
  auth: Auth;
  homeContent: {homeContent: { title: string; comments: string }};
  familyPics: {familyPics: IAnyPics[] | []};
  youthPics: {youthPics: IAnyPics[] | []};
  books: {books: IAnyPics[] | []};
  otherPics: {otherPics: IAnyPics[], editPic: IAnyPics};
  showTable: {showTable: boolean};
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
