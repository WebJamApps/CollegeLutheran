import type { Ibook } from 'src/providers/Content.provider';

export interface Store {
  youthContent: { youthContent: Ibook };
  homeContent: { homeContent: Ibook };
  // habitatContent: { habitatContent: Ibook };
  books: { books: Ibook[] };
  showTable: { showTable: boolean };
}

const mapStoreToProps = (store: Store): Record<string, unknown> => ({
  homeContent: store.homeContent.homeContent,
  youthContent: store.youthContent.youthContent,
  // habitatContent: store.habitatContent.habitatContent,
  books: store.books.books,
  showTable: store.showTable.showTable,
});
export default mapStoreToProps;
