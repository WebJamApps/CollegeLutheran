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
  books: Ibook[];
  youthContent: Ibook;
}
export class AdminDashboard extends Component<IadminDashboardProps> {
  commonUtils = CommonUtils;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IadminDashboardProps) {
    super(props);
  }

  componentDidMount(): void { this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width); }

  render(): JSX.Element {
    const {
      dispatch, books,
      youthContent,
    } = this.props;
    return (
      <AdminDashboardContent
        dispatch={dispatch}
        books={books}
        youthContent={youthContent}
      />
    );
  }
}

export default connect(mapStoreToProps, null)(AdminDashboard as any);
