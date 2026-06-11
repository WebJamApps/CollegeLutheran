import {
  Button, TextField, Checkbox, FormControlLabel, FormGroup, Stack, CircularProgress,
} from '@mui/material';
import {
  SetStateAction, useContext, useEffect, useState,
} from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import './adminDashboard.scss';
import { CreatePicDialog } from './CreatePicDialog';
import utils from './utils';
import { EditPicTable } from './EditPic/EditPicTable';
import { ChangePageSection } from './ChangePageSection';

export function ChangeHomePageSect() {
  return (
    <ChangePageSection
      pageType="homePage"
      formTitle="Homepage Section"
      withInput
    />
  );
}

export function ChangeYouthPageSect() {
  return (
    <ChangePageSection
      pageType="youthPage"
      formTitle="Youthpage Section"
      withInput
    />
  );
}

export function ChangeStewardshipPageSect() {
  return (
    <ChangePageSection
      pageType="stewardshipPage"
      formTitle="Stewardship Page Section"
      withToggle
    />
  );
}

// export function ChangeHabitatPageSect() {
//   return (
//     <ChangePageSection
//       pageType="habitatPage"
//       formTitle="Habitatpage Section"
//     />
//   );
// }

export function makeHandleChange(setComments: React.Dispatch<SetStateAction<string>>) {
  return (evt: { target: { checked: any; }; }) => {
    if (evt.target.checked) setComments('worshipbulletin');
    else setComments('');
  };
}

export function ChangeNewsPage() {
  const { getNews } = useContext(ContentContext);
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const clearForm = () => {
    setTitle(''); setUrl(''); setComments('');
  };
  const handleChange = makeHandleChange(setComments);

  const handleAddNews = async () => {
    setLoading(true);
    try {
      await utils.addNewsAPI(auth, getNews, clearForm, { title, url, comments });
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        onClick={handleAddNews}
      >
        {loading ? <CircularProgress size={20} color="inherit" className="addNewsSpinner" /> : 'Add News'}
      </Button>
    </div>
  );
}

export function ReconnectFacebook() {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => { utils.loadFbSdk(); }, []);
  const handleReconnect = async () => {
    setLoading(true);
    try {
      await utils.reconnectFacebookAPI(auth);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="material-content elevation3" style={{ maxWidth: '8in', margin: '20px auto auto auto', textAlign: 'center' }}>
      <h5>Homepage Facebook Feed</h5>
      <p style={{ fontSize: '10pt' }}>
        If the homepage Facebook feed stops updating, click below and log in as the page
        admin to refresh the connection.
      </p>
      <Button
        size="small"
        variant="contained"
        className="reconnectFbButton"
        disabled={loading}
        onClick={handleReconnect}
      >
        {loading ? <CircularProgress size={20} color="inherit" className="reconnectFbSpinner" /> : 'Reconnect Facebook'}
      </Button>
    </div>
  );
}
interface IbuttonsNavProps {
  setShowEditor: (arg0: string) => void; showEditor: string;
}
export function ButtonsNav(props: IbuttonsNavProps) {
  const { setShowEditor, showEditor } = props;
  return (
    <Stack direction="row" spacing={2} style={{ textAlign: 'center', marginLeft: '1%' }}>
      <Button
        size="small"
        sx={{ textAlign: 'center' }}
        variant="contained"
        id="a-d"
        className="createPic"
        onClick={() => setShowEditor('createPic')}
      >
        Add Picture
      </Button>
      <Button
        size="small"
        sx={{ textAlign: 'center' }}
        variant="contained"
        id="a-d"
        className="editPic"
        onClick={() => setShowEditor('editPic')}
      >
        Edit Picture
      </Button>
      <Button
        size="small"
        sx={{ textAlign: 'center' }}
        variant="contained"
        id="a-d"
        className="editContent"
        onClick={() => setShowEditor('editContent')}
      >
        Edit Page Content
      </Button>
      {showEditor !== 'editPic' && (
        <Button
          size="small"
          sx={{ textAlign: 'center' }}
          id="a-d"
          variant="outlined"
          onClick={() => (showEditor === 'editContent' ? setShowEditor('') : window.location.assign('/'))}
        >
          Cancel
        </Button>
      )}
    </Stack>
  );
}

export function AdminDashboardContent() {
  const [showEditor, setShowEditor] = useState('');
  return (
    <div style={{ minHeight: showEditor !== 'editContent' ? '80vh' : 'inherit' }}>
      <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
      <ButtonsNav showEditor={showEditor} setShowEditor={setShowEditor} />
      {showEditor === '' ? <ChangeNewsPage /> : null}
      {showEditor === '' ? <ReconnectFacebook /> : null}
      {showEditor === 'createPic' && <CreatePicDialog showEditor={showEditor} onClose={() => setShowEditor('')} />}
      {showEditor === 'editPic' && <EditPicTable onClose={() => setShowEditor('')} />}
      {showEditor === 'editContent' ? (
        <>
          <ChangeHomePageSect />
          {/* <ChangeHabitatPageSect /> */}
          <ChangeStewardshipPageSect />
          <ChangeYouthPageSect />
        </>
      ) : null}
    </div>
  );
}

