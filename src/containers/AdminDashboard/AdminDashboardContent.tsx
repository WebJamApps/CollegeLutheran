import {
  Button, TextField, Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import {
  Dispatch, SetStateAction, useContext, useState,
} from 'react';
import forms from 'src/lib/forms';
import { AuthContext } from 'src/providers/Auth.provider';
import type { Ibook } from 'src/redux/mapStoreToProps';
import utils from './utils';

function UpdateHomeButton(
  { title, dispatch, comments = '' }: { title: string, dispatch: Dispatch<unknown>, comments?: string },
): JSX.Element {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ marginTop: '10px' }}>
      <Button
        size="small"
        variant="contained"
        type="button"
        id="c-h"
        onClick={(evt) => utils.putAPI({ title, comments, type: 'homePageContent' }, auth, dispatch)}
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
          <p style={{ fontSize: '12pt', marginTop: '12px', marginBottom: '2px' }}>Content</p>
          <CommentsEditor comments={comments} setComments={setComments} />
          <UpdateHomeButton title={title} comments={comments} dispatch={dispatch} />
        </form>
      </div>
    </div>
  );
}

function ChangeNewsPage(): JSX.Element {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState('');
  return (
    <div className="material-content elevation3" style={{ maxWidth: '8in', margin: '30px auto auto auto' }}>
      <h5>Change News Page</h5>
      <FormGroup>
        <TextField label="Title" onChange={(evt) => setTitle(evt.target.value)} sx={{ marginBottom: '10px' }} />
        <TextField label="Url" onChange={(evt) => setUrl(evt.target.value)} />
        <FormControlLabel
          label="Is Worship Bulletin?"
          control={(
            <Checkbox onChange={
            (evt) => {
              if (evt.target.checked) setComments('worshipbulletin');
              else setComments('');
            }
          }
            />
        )}
        />
      </FormGroup>
      <hr />
      <Button size="small" variant="contained" onClick={() => utils.addNewsAPI(auth, title, url, comments)}>
        Add News
      </Button>
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
      <ChangeNewsPage />
    </div>
  );
}
