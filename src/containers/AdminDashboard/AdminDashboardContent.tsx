import {
  Button, TextField, Checkbox, FormControlLabel, FormGroup, Stack,
} from '@mui/material';
import {
  SetStateAction, useContext, useState,
} from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import './adminDashboard.scss';
import { CreatePicDialog } from './CreatePicDialog';
import utils from './utils';
import { EditPicTable } from './EditPicTable';
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

// export function ChangeStewardshipPageSect() {
//   return (
//     <ChangePageSection
//       pageType="stewardshipPage"
//       formTitle="Stewardshippage Section"
//     />
//   );
// }

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
interface IbuttonsNavProps {
  setShowEditor:(arg0:string)=>void;showEditor:string;
}
export function ButtonsNav(props:IbuttonsNavProps) {
  const { setShowEditor, showEditor } = props;
  return (
    <Stack direction="row" spacing={2} style={{ textAlign: 'center', marginLeft: '1%' }}>
      <Button
        size="small"
        sx={{ textAlign: 'center' }}
        variant="contained"
        id="a-d"
        onClick={() => setShowEditor('createPic')}
      >
        Add Picture
      </Button>
      <Button
        size="small"
        sx={{ textAlign: 'center' }}
        variant="contained"
        id="a-d"
        onClick={() => setShowEditor('editPic')}
      >
        Edit Picture
      </Button>
      <Button
        size="small"
        sx={{ textAlign: 'center' }}
        variant="contained"
        id="a-d"
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
      { showEditor === 'createPic' && <CreatePicDialog showEditor={showEditor} onClose={() => setShowEditor('')} /> }
      { showEditor === 'editPic' && <EditPicTable onClose={() => setShowEditor('')} />}
      { showEditor === 'editContent' ? (
        <>
          <ChangeHomePageSect />
          {/* <ChangeHabitatPageSect /> */}
          {/* <ChangeStewardshipPageSect /> */}
          <ChangeYouthPageSect />
        </>
      ) : null}
    </div>
  );
}

