export interface Book {
  _id: string,
  title: string
  created_at: string
}
export interface Auth {
  isAuthenticated: boolean,
  error: string,
  email: string,
  token: string,
  user: any,
}
const mapStoreToProps = (store: any):any => ({
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
