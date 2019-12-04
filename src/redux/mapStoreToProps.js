const mapStoreToProps = (store) => ({
  images: store.images.images,
  auth: store.auth,
  tour: store.tour.tour,
  tourUpdated: store.tour.tourUpdated,
});
export default mapStoreToProps;
