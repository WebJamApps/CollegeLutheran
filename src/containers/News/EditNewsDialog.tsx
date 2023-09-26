import {
  Button,
  Checkbox,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField,
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import utils, { defaultNews } from './utilsN';

interface InewsTextFieldProps {
  value: string,
  label: string,
  className: string
  onChange: (arg0: any) => any
}

export function NewsTextField(props: InewsTextFieldProps) {
  const {
    value, label, onChange, className,
  } = props;
  return (
    <TextField
      sx={{ marginTop: '20px' }}
      label={label}
      type="text"
      fullWidth
      className={className}
      value={value}
      onChange={onChange}
    />
  );
}

function checkDisabled(editNews: typeof defaultNews): boolean {
  return !!(editNews.title && editNews.url);
}

interface IeditNewsContentProps {
  editNewsState:IeditNewsDialogProps, showHideCaption:(evt: any) => void
}
export function EditNewsContent(props:IeditNewsContentProps) {
  const { editNewsState, showHideCaption } = props;
  const { editNews, setEditNews } = editNewsState;
  return (
    <DialogContent sx={{ padding: '10px 10px' }}>
      <NewsTextField
        value={editNews.url as string}
        label="* URL"
        className="url"
        onChange={(evt) => {
          const { target: { value } } = evt;
          setEditNews({ ...editNews, url: value });
          return value;
        }}
      />
      <NewsTextField
        value={editNews.title}
        label="* Title"
        className="title"
        onChange={(evt) => {
          const { target: { value } } = evt;
          setEditNews({ ...editNews, title: value });
          return value;
        }}
      />
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={editNews.comments === 'worshipbulletin'}
              onClick={showHideCaption}
            />
      )}
          label="Show as Worship Bulletin"
        />
      </FormGroup>
    </DialogContent>
  );
}

export interface IeditNewsDialogProps {
  editNews: typeof defaultNews, setEditNews: (arg0: typeof defaultNews) => void,
}

export function EditNewsButtons(props: IeditNewsDialogProps) {
  const { editNews, setEditNews } = props;
  const { auth } = useContext(AuthContext);
  const { getNews } = useContext(ContentContext);
  return (
    <DialogActions>
      <>
        <Button
          disabled={!checkDisabled(editNews)}
          size="small"
          variant="contained"
          className="updateNewsButton"
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
          onClick={() => { utils.updateNews(editNews, auth, getNews, setEditNews); }}
        >
          Update
        </Button>
        <Button
          style={{ backgroundColor: 'red', color: 'white' }}
          size="small"
          className="deleteNewsButton"
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
          onClick={() => { utils.deleteNews(editNews, getNews, auth, setEditNews); }}
        >
          Delete
        </Button>
        <Button
          size="small"
          className="cancelNewsButton"
          onClick={() => setEditNews(defaultNews)}
        >
          Cancel
        </Button>
      </>
    </DialogActions>
  );
}

export function EditNewsDialog({ editNews, setEditNews }: IeditNewsDialogProps) {
  const showHideCaption = utils.makeShowHideBulletin(setEditNews, editNews);
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="editNewsDialog"
      open={editNews._id !== ''}
      onClose={() => setEditNews(defaultNews)}
    >
      <DialogTitle>Edit News</DialogTitle>
      <EditNewsContent showHideCaption={showHideCaption} editNewsState={{ editNews, setEditNews }} />
      <EditNewsButtons editNews={editNews} setEditNews={setEditNews} />
    </Dialog>
  );
}

