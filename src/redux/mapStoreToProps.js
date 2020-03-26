const mapStoreToProps = (store) => ({
  auth: store.auth,
  homeContent: store.homeContent.homeContent,
  familyPics: store.familyPics.familyPics,
  youthPics: store.youthPics.youthPics,
  books: store.books.books,
  otherPics: store.otherPics.otherPics,
  editPic: store.otherPics.editPic,
});
export default mapStoreToProps;
