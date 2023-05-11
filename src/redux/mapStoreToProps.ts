import type { Ibook } from 'src/providers/utils';

export interface Store {
  youthContent: { youthContent: Ibook };
  homeContent: { homeContent: Ibook };
  books: { books: Ibook[] };
  showTable: { showTable: boolean };
}

const mapStoreToProps = (store: Store): Record<string, unknown> => ({
  homeContent: store.homeContent.homeContent,
  youthContent: store.youthContent.youthContent,
  books: store.books.books,
  showTable: store.showTable.showTable,
});
export default mapStoreToProps;
