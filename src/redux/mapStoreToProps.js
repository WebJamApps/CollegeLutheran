const mapStoreToProps = (store) => ({
  images: store.images.images,
  auth: store.auth,
  // tour: store.tour.tour,
  homeContent: store.homeContent.homeContent,
  familyPics: store.familyPics.familyPics,
  youthPics: store.youthPics.youthPics,
  // tourUpdated: store.tour.tourUpdated,
});
export default mapStoreToProps;
