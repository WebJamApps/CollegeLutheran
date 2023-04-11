import {
  Button, TextField, Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import {
  SetStateAction, useContext, useEffect, useState,
} from 'react';
import type { AnyAction, Dispatch } from 'redux';
import forms from 'src/lib/forms';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import type { Ibook } from 'src/redux/mapStoreToProps';
import { CreatePicDialog } from './CreatePicDialog';
import utils from './utils';

function UpdateHomeButton(
  {
    title,
    getContent,
    comments = '',
  }: { title: string,
    getContent: () => Promise<void>,
    comments?: string },
): JSX.Element {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ marginTop: '10px' }}>
      <Button
        size="small"
        variant="contained"
        type="button"
        id="c-h"
        onClick={(evt) => utils.putAPI({ title, comments, type: 'homePageContent' }, auth, getContent)}
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

function ChangeHomepage(
): JSX.Element {
  const { content: { homePage }, getContent } = useContext(ContentContext);
  const [title, setTitle] = useState(homePage.title);
  const [comments, setComments] = useState(homePage.comments);
  const inputParams = {
    type: 'text',
    label: 'Title',
    isRequired: false,
    onChange: (evt: { target: { value: SetStateAction<string>; }; }) => setTitle(evt.target.value),
    value: title,
    width: '90%',
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { (async () => { await getContent(); })(); }, []);
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
          <UpdateHomeButton
            getContent={getContent}
            title={title}
            comments={comments}
          />
        </form>
      </div>
    </div>
  );
}

function ChangeNewsPage({ dispatch }:{ dispatch:Dispatch<AnyAction> }): JSX.Element {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState('');
  const clearForm = () => {
    setTitle(''); setUrl(''); setComments('');
  };
  return (
    <div className="material-content elevation3" style={{ maxWidth: '8in', margin: '30px auto auto auto' }}>
      <h5>Add to News Page</h5>
      <FormGroup>
        <TextField label="Title" value={title} onChange={(evt) => setTitle(evt.target.value)} sx={{ marginBottom: '10px' }} />
        <TextField label="Url" value={url} onChange={(evt) => setUrl(evt.target.value)} />
        <FormControlLabel
          label="Is Worship Bulletin?"
          control={(
            <Checkbox
              checked={comments === 'worshipbulletin'}
              onChange={
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
      <Button
        size="small"
        variant="contained"
        onClick={() => utils.addNewsAPI(
          auth, dispatch, clearForm, { title, url, comments },
        )}
      >
        Add News
      </Button>
    </div>
  );
}

interface IadminDashboardContentProps {
  dispatch: Dispatch<AnyAction>,
  youthContent: Ibook, books: Ibook[]
}
export function AdminDashboardContent(props: IadminDashboardContentProps) {
  const {
    dispatch,
    youthContent, books,
  } = props;
  const [showCreatePic, setShowCreatePic] = useState(false);
  return (
    <div className="page-content">
      <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
      <ChangeHomepage />
      <div style={{ margin: 'auto', maxWidth: '400px' }}>
        <Button
          sx={{ textAlign: 'center' }}
          variant="contained"
          size="large"
          onClick={() => setShowCreatePic(true)}
        >
          Add New Picture
        </Button>
      </div>
      <ChangeNewsPage dispatch={dispatch} />
      <CreatePicDialog showDialog={showCreatePic} setShowDialog={setShowCreatePic} />
    </div>
  );
}
