const mapStoreToProps = (store) => ({
  images: store.images.images,
  auth: store.auth,
  homeContent: store.homeContent.homeContent,
  familyPics: store.familyPics.familyPics,
  youthPics: store.youthPics.youthPics,
  books: store.books.books,
});
export default mapStoreToProps;
