import { Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import {
  Dispatch, SetStateAction, useContext, useState,
} from 'react';
import forms from 'src/lib/forms';
import { AuthContext } from 'src/providers/Auth.provider';
import type { Ibook } from 'src/redux/mapStoreToProps';
import utils from './utils';

function UpdateHomeButton(
  { title, comments = '' }: { title: string, comments?: string },
): JSX.Element {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ marginLeft: '60%', marginTop: '10px' }}>
      <Button
        type="button"
        id="c-h"
        onClick={(evt) => utils.putAPI({ title, comments, type: 'homePageContent' }, auth)}
      >
        Update Homepage
      </Button>
    </div>
  );
}

interface IcommentsEditorProps {
  comments: string | undefined, setComments: (arg0: string) => void
}
function CommentsEditor(
  props: IcommentsEditorProps,
): JSX.Element {
  const { setComments, comments } = props;
  return (
    <Editor
      apiKey={process.env.TINY_KEY}
      value={comments}
      init={{
        height: 500,
        menubar: 'insert tools',
        menu: { format: { title: 'Format', items: 'forecolor backcolor' } },
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor forecolor |'
          + 'alignleft aligncenter alignright alignjustify |'
          + 'bullist numlist outdent indent | removeformat | help',
      }}
      onEditorChange={(newComments) => setComments(newComments)}
    />
  );
}

interface IchangeHomepageProps {
  homeContent: Ibook, dispatch: Dispatch<unknown>
}
function ChangeHomepage(props: IchangeHomepageProps): JSX.Element {
  const { homeContent, dispatch } = props;
  const [title, setTitle] = useState(homeContent.title);
  const [comments, setComments] = useState(homeContent.comments);
  const inputParams = {
    type: 'text',
    label: 'Title',
    isRequired: false,
    onChange: (evt: { target: { value: SetStateAction<string>; }; }) => setTitle(evt.target.value),
    value: title,
    width: '90%',
  };
  return (
    <div className="horiz-scroll">
      <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
        <h5>Change Homepage Section</h5>
        <form
          id="create-homepage"
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {forms.makeInput(inputParams)}
          <p>Content</p>
          <CommentsEditor comments={comments} setComments={setComments} />
          <UpdateHomeButton title={title} comments={comments} />
        </form>
      </div>
    </div>
  );
}

interface IadminDashboardContentProps {
  dispatch: Dispatch<unknown>, homeContent: Ibook, youthContent: Ibook, books: Ibook[]
}
export function AdminDashboardContent(props: IadminDashboardContentProps) {
  const {
    dispatch, homeContent, youthContent, books,
  } = props;
  return (
    <div className="page-content">
      <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
      <ChangeHomepage homeContent={homeContent} dispatch={dispatch} />
      {/* {this.controller.addForumForm()} */}
      {/* <EditPic editPic={editPic} auth={auth} dispatch={dispatch} /> */}
      {/* {showTable ? (
          // @ts-ignore
          // eslint-disable-next-line max-len
          // <PTable auth={auth} dispatch={dispatch} youthPics={youthPics}
          familyPics={familyPics} otherPics={otherPics} musicPics={musicPics} habitatPics={habitatPics} />
        ) : null} */}
      {/* <YouthPageEditor
        comp={this}
        youthContent={youthContent}
        youthTitle={youthTitle}
        makeInput={this.forms.makeInput}
      /> */}
      {/* <AdminUserForm comp={this} /> */}
    </div>
  );
}
