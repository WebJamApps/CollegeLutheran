/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
// import Forms from 'src/lib/forms';
import CommonUtils from 'src/lib/commonUtils';
import type { Ibook } from 'src/redux/mapStoreToProps';
import mapStoreToProps from 'src/redux/mapStoreToProps';
// import PTable from 'src/components/PhotoTable';
// import YouthPageEditor from 'src/components/YouthPageEditor';
// import AdminUserForm from 'src/components/AdminUserForm';
// import AdminController from './AdminController';
// import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import { AdminDashboardContent } from './AdminDashboardContent';
// import { EditPic } from './EditPic';

// export interface PicData {
//   buttonId: string; buttonClick: (e: React.ChangeEvent<EventTarget>) => Promise<string>; title: string; nameId: string;
// }
export interface IadminDashboardProps {
  dispatch: Dispatch<unknown>;
  homeContent: Ibook;// homepage text
  // auth: { token: string };
  books: Ibook[];// news table
  // showTable: boolean;
  // editPic: Ibook;
  // youthPics: Ibook[];
  // familyPics: Ibook[];
  // otherPics: Ibook[];
  // musicPics: Ibook[];
  // habitatPics: Ibook[];
  youthContent: Ibook;// youth page text
}
// type DashboardState = {
//   type: string;
//   title: string;
//   homePageContent: string;
//   newstitle: string;
//   newsurl: string;
//   youthName: string;
//   youthURL: string;
//   forumId: string;
//   showCaption: string;
//   firstEdit: boolean;
//   addAdminEmail: string;
//   formError: string;
//   youthTitle: string;
//   youthContent: string;
//   isworshipbulletin: string;
// };
export class AdminDashboard extends Component<IadminDashboardProps> {
  commonUtils = CommonUtils;

  // controller: AdminController;

  // forms = Forms;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IadminDashboardProps) {
    super(props);
    // this.controller = new AdminController(this);
    // this.state = {
    //   isworshipbulletin: '',
    //   type: '',
    //   title: props.homeContent.title || '',
    //   homePageContent: props.homeContent.comments || '',
    //   newstitle: '',
    //   newsurl: '',
    //   youthName: '',
    //   youthURL: '',
    //   forumId: '',
    //   showCaption: '',
    //   firstEdit: true,
    //   addAdminEmail: '',
    //   formError: '',
    //   youthTitle: props.youthContent.title || '',
    //   youthContent: props.youthContent.comments || '',
    // };
    // this.onChange = this.onChange.bind(this);
    // this.onChangeAddForum = this.onChangeAddForum.bind(this);
    // this.onChangeSelect = this.onChangeSelect.bind(this);
    // this.checkEdit = this.checkEdit.bind(this);
    // this.changeHomepage = this.changeHomepage.bind(this);
    // this.deleteForumForm = this.deleteForumForm.bind(this);
    // this.resetEditForm = this.resetEditForm.bind(this);
    // this.onChangeAdminEmail = this.onChangeAdminEmail.bind(this);
  }

  componentDidMount(): void { this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width); }

  // onChange(evt: React.ChangeEvent<HTMLInputElement>, stateValue?: string): string {
  //   evt.persist();
  //   this.checkEdit();
  //   if (typeof stateValue === 'string') {
  //     this.setState((prevState) => ({ ...prevState, [stateValue]: evt.target.value, firstEdit: false }));
  //     return stateValue;
  //   }
  //   this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value, firstEdit: false }));
  //   return evt.target.id;
  // }

  // onChangeAddForum(evt: React.ChangeEvent<HTMLInputElement>): string {
  //   evt.persist();
  //   this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value }));
  //   return evt.target.id;
  // }

  // onChangeAdminEmail(evt: React.ChangeEvent<HTMLInputElement>): string {
  //   evt.persist();
  //   this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value, formError: '' }));
  //   return evt.target.id;
  // }

  // onChangeSelect(evt: React.ChangeEvent<HTMLSelectElement>, stateValue?: string): string {
  //   evt.persist();
  //   this.checkEdit();
  //   if (typeof stateValue === 'string') {
  //     this.setState((prevState) => ({ ...prevState, [stateValue]: evt.target.value }));
  //     return stateValue;
  //   }
  //   this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value }));
  //   return evt.target.id;
  // }

  // checkEdit(): void {
  //   let {
  //     youthName, youthURL, type, showCaption,
  //   } = this.state;
  //   const { editPic } = this.props;
  //   if (youthName === '' && editPic.title !== undefined) youthName = editPic.title;
  //   if (youthURL === '' && editPic.url !== undefined) youthURL = editPic.url;
  //   if (type === '' && editPic.type !== undefined) type = editPic.type;
  //   if (showCaption === '' && editPic.comments !== undefined) showCaption = editPic.comments;
  //   this.setState({
  //     youthName, youthURL, type, showCaption,
  //   });
  // }

  // resetEditForm(evt: React.MouseEvent<HTMLButtonElement>): void {
  //   evt.preventDefault();
  //   const { dispatch } = this.props;
  //   dispatch({ type: 'EDIT_PIC', picData: {} });
  //   dispatch({ type: 'SHOW_TABLE', showTable: true });
  //   this.setState({
  //     youthName: '', youthURL: '', type: '', showCaption: '', firstEdit: true,
  //   });
  // }

  // deleteForumForm(forumId: string, options: Record<string, string>[]): JSX.Element {
  //   const ddParams = {
  //     htmlFor: 'forumId',
  //     labelText: '* Select Title to Delete',
  //     value: forumId,
  //     onChange: this.onChangeSelect,
  //     options,
  //     oValue: '_id',
  //     dValue: 'title',
  //   };
  //   return (
  //     <form
  //       id="delete-forum"
  //       style={{
  //         textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '100%',
  //       }}
  //     >
  //       {this.forms.makeDataDropdown(ddParams)}
  //       <p> </p>
  //       <button
  //         onClick={(evt) => this.controller.deleteBookApi(evt, forumId, '/news')}
  //         type="button"
  //         disabled={this.controller.validateDeleteBook(forumId)}
  //       >
  //         Delete
  //       </button>
  //     </form>
  //   );
  // }

  // updateHomeButton(title:string, homePageContent:string):JSX.Element {
  //   return (
  //     <div style={{ marginLeft: '60%', marginTop: '10px' }}>
  //       <button
  //         type="button"
  //         id="c-h"
  //         disabled={false}
  //         onClick={(evt) => this.controller.putAPI(evt, { title, comments: homePageContent, type: 'homePageContent' }, '/')}
  //       >
  //         Update Homepage
  //       </button>
  //     </div>
  //   );
  // }

  // changeHomepage(): JSX.Element {
  //   const { title, homePageContent } = this.state;
  //   const inputParams = {
  //     type: 'text', label: 'Title', isRequired: false, onChange: this.onChange, value: title, width: '90%',
  //   };
  //   return (
  //     <div className="horiz-scroll">
  //       <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
  //         <h5>Change Homepage Section</h5>
  //         <form
  //           id="create-homepage"
  //           style={{
  //             textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
  //           }}
  //         >
  //           {this.forms.makeInput(inputParams)}
  //           <label htmlFor="content">
  //             Content
  //             <br />
  //             {this.controller.editor(homePageContent)}
  //           </label>
  //           {this.updateHomeButton(title, homePageContent)}
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }

  render(): JSX.Element {
    const {
      dispatch, books, homeContent, youthContent,
      // showTable, auth, dispatch, youthPics, familyPics, otherPics, musicPics, habitatPics, editPic,
    } = this.props;
    // const { youthTitle, youthContent } = this.state;
    return <AdminDashboardContent dispatch={dispatch} books={books} homeContent={homeContent} youthContent={youthContent} />;
  }
}

export default connect(mapStoreToProps, null)(AdminDashboard as any);
