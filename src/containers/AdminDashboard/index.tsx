/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Component } from 'react';
import { connect } from 'react-redux';
import type { AnyAction, Dispatch } from 'redux';
import CommonUtils from 'src/lib/commonUtils';
import type { Ibook } from 'src/redux/mapStoreToProps';
import mapStoreToProps from 'src/redux/mapStoreToProps';
import { AdminDashboardContent } from './AdminDashboardContent';

export interface IadminDashboardProps {
  dispatch: Dispatch<AnyAction>;
  homeContent: Ibook;// homepage text
  books: Ibook[];// news table
  youthContent: Ibook;// youth page text
}
// export interface IadminDashboardProps {
//   getContent: Promise<void>;
//   homePage: Ibook;// homepage text
//   books: Ibook[];// news table
//   youthPage: Ibook;// youth page text
//   dispatch: Dispatch<AnyAction>;
// }
export class AdminDashboard extends Component<IadminDashboardProps> {
  commonUtils = CommonUtils;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IadminDashboardProps) {
    super(props);
  }

  componentDidMount(): void { this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width); }

  render(): JSX.Element {
    const {
      dispatch, books, homeContent, youthContent,
    } = this.props;
    return <AdminDashboardContent dispatch={dispatch} books={books} homeContent={homeContent} youthContent={youthContent} />;
  }
  // render(): JSX.Element {
  //   const {
  //     getContent, books, homePage, youthPage, dispatch,
  //   } = this.props;
  //   return <AdminDashboardContent dispatch={dispatch} getContent={getContent} books={books} homePage={homePage} youthPage={youthPage} />;
  // }
}

export default connect(mapStoreToProps, null)(AdminDashboard as any);
