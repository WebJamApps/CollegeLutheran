const mapStoreToProps = (store) => ({
  images: store.images.images,
  auth: store.auth,
});
export default mapStoreToProps;
