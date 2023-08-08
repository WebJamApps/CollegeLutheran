import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import { Ibook } from 'src/providers/utils';
import utils, { defaultNews } from './utilsN';

interface InewsTextFieldProps {
  value: string,
  label: string,
  onChange: (arg0: any) => any
}

export function NewsTextField(props: InewsTextFieldProps) {
  const { value, label, onChange } = props;
  return (
    <TextField
      sx={{ marginTop: '20px' }}
      label={label}
      type="text"
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
}

function checkDisabled(editNews: typeof defaultNews): boolean {
  return !!(editNews.title && editNews.url);
}

export interface IeditNewsDialogProps {
  editNews: typeof defaultNews, setEditNews: (arg0: typeof defaultNews) => void,
}

export function EditNewsDialog({ editNews, setEditNews }: IeditNewsDialogProps) {
  const { auth } = useContext(AuthContext);
  const { getNews } = useContext(ContentContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showHideCaption = utils.makeShowHideBulletin(setEditNews, editNews);
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="editNewsDialog"
      open={editNews._id !== ''}
      onClose={() => setEditNews({} as Ibook)}
    >
      <DialogTitle>Edit News</DialogTitle>
      <DialogContent sx={{ padding: '10px 10px' }}>
        <NewsTextField
          value={editNews.url as string}
          label="* URL"
          onChange={(evt) => {
            const { target: { value } } = evt;
            setEditNews({ ...editNews, url: value });
            return value;
          }}
        />
        <NewsTextField
          value={editNews.title}
          label="* Title"
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
      <DialogActions>
        {isSubmitting ? <CircularProgress /> : (
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
              className="cancelPicButton"
              // onClick={() => setEditNews(defaultNews)}
              onClick={() => setEditNews(defaultNews)}

            >
              Cancel
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

