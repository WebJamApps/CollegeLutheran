import {
  Button, TextField, Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import {
  SetStateAction, useContext, useEffect, useState,
} from 'react';
import forms from 'src/lib/forms';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import { CreatePicDialog } from './CreatePicDialog';
import utils from './utils';

export function UpdateButton(
  {
    title = '',
    getContent,
    comments = '',
    buttonName,
    type,
  }: { title: string,
    getContent: () => Promise<void>,
    comments?: string,
    buttonName: string,
    type: 'habitatPageContent' | 'homePageContent' | 'stewardshipPageContent' | 'youthPageContent' },
): JSX.Element {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ marginTop: '10px' }}>
      <Button
        size="small"
        variant="contained"
        type="button"
        id="c-h"
        onClick={() => utils.putAPI({ title, comments, type }, auth, getContent)}
      >
        {buttonName}
      </Button>
    </div>
  );
}

interface IcommentsEditorProps {
  comments: string | undefined, setComments: (arg0: string) => void
}
export function CommentsEditor(
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

export interface IchangePageSectionWithTitleProps {
  pageType: 'youthPage' | 'homePage',
  formTitle: string,
}

export function ChangePageSectionWithTitle(props: IchangePageSectionWithTitleProps) {
  const { pageType, formTitle } = props;
  const { content, getContent } = useContext(ContentContext);
  const [title, setTitle] = useState(content[pageType].title);
  const [comments, setComments] = useState(content[pageType].comments);
  const inputParams = {
    type: 'text',
    label: 'Title',
    isRequired: false,
    onChange: (evt: { target: { value: SetStateAction<string>; }; }) => {
      const { target: { value } } = evt;
      setTitle(value);
      return value;
    },
    value: title,
    width: '90%',
  };
  // eslint-disable-next-line no-void, react-hooks/exhaustive-deps
  useEffect(() => { void getContent(); }, []);
  return (
    <div className="horiz-scroll">
      <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
        <h5>{formTitle}</h5>
        <form
          id={`create-${pageType}`}
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {forms.makeInput(inputParams)}
          <p style={{ fontSize: '12pt', marginTop: '12px', marginBottom: '2px' }}>Content</p>
          <CommentsEditor comments={comments} setComments={setComments} />
          <UpdateButton
            getContent={getContent}
            title={title}
            comments={comments}
            type={`${pageType}Content`}
            buttonName={`Update ${formTitle}`}
          />
        </form>
      </div>
    </div>
  );
}
export function ChangeHomePageSect() {
  return (
    <ChangePageSectionWithTitle
      pageType="homePage"
      formTitle="Homepage Section"
    />
  );
}
export function ChangeYouthPageSect() {
  return (
    <ChangePageSectionWithTitle
      pageType="youthPage"
      formTitle="Youthpage Section"
    />
  );
}
export interface IchangePageSectionProps {
  pageType: 'habitatPage' | 'stewardshipPage',
  formTitle: string,
}
export function ChangePageSection(props: IchangePageSectionProps) {
  const { pageType, formTitle } = props;
  const { content, getContent } = useContext(ContentContext);
  const [title] = useState(content[pageType].title);
  const [comments, setComments] = useState(content[pageType].comments);
  // eslint-disable-next-line no-void, react-hooks/exhaustive-deps
  return (
    <div className="horiz-scroll">
      <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
        <h5>{formTitle}</h5>
        <form
          id={`create-${pageType}`}
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          <p style={{ fontSize: '12pt', marginTop: '12px', marginBottom: '2px' }}>Content</p>
          <CommentsEditor comments={comments} setComments={setComments} />
          <UpdateButton
            getContent={getContent}
            title={title}
            comments={comments}
            type={`${pageType}Content`}
            buttonName={`Update ${formTitle}`}
          />
        </form>
      </div>
    </div>
  );
}
export function ChangeStewardshipPageSect() {
  return (
    <ChangePageSection
      pageType="stewardshipPage"
      formTitle="Stewardshippage Section"
    />
  );
}
export function ChangeHabitatPageSect() {
  return (
    <ChangePageSection
      pageType="habitatPage"
      formTitle="Habitatpage Section"
    />
  );
}

export function makeHandleChange(setComments: React.Dispatch<SetStateAction<string>>) {
  return (evt: { target: { checked: any; }; }) => {
    if (evt.target.checked) setComments('worshipbulletin');
    else setComments('');
  };
}
export function ChangeNewsPage(): JSX.Element {
  const { getNews } = useContext(ContentContext);
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState('');
  const clearForm = () => {
    setTitle(''); setUrl(''); setComments('');
  };
  const handleChange = makeHandleChange(setComments);
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
              handleChange
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
          auth, getNews, clearForm, { title, url, comments },
        )}
      >
        Add News
      </Button>
    </div>
  );
}

export function makeHandleClick(setShowCreatePic: React.Dispatch<SetStateAction<boolean>>) {
  return () => setShowCreatePic(true);
}

export function AdminDashboardContent() {
  const [showCreatePic, setShowCreatePic] = useState(false);
  const handleClick = makeHandleClick(setShowCreatePic);
  return (
    <div className="page-content">
      <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
      <ChangeHomePageSect />
      <div style={{ margin: 'auto', maxWidth: '400px' }}>
        <Button
          sx={{ textAlign: 'center' }}
          variant="contained"
          size="large"
          id="a-d"
          onClick={handleClick}
        >
          Add New Picture
        </Button>
      </div>
      <ChangeNewsPage />
      <CreatePicDialog showDialog={showCreatePic} setShowDialog={setShowCreatePic} />
      <ChangeHabitatPageSect />
      <ChangeStewardshipPageSect />
      <ChangeYouthPageSect />
    </div>
  );
}

