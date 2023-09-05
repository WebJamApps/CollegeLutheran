import { useContext } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import {
  Button,
  Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup,
} from '@mui/material';
import utils, { defaultPic } from './pictures.utils';
import { EditPicTextField } from './EditPicTextField';

function checkDisabled(editPic: typeof defaultPic):boolean {
  return !!(editPic.title && editPic.url);
}

interface IeditPicDialogProps {
  setShowTable:(arg0:boolean) => void,
  editPic: typeof defaultPic, setEditPic: (arg0:typeof defaultPic) => void,
}
export function EditPicDialog({ editPic, setEditPic, setShowTable }: IeditPicDialogProps) {
  const { auth } = useContext(AuthContext);
  const { getPictures } = useContext(ContentContext);
  const showHideCaption = utils.makeShowHideCaption(setEditPic, editPic);
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="editPicDialog"
      open={editPic._id !== ''}
      onClose={() => setEditPic(defaultPic)}
    >
      <DialogTitle>Edit Picture</DialogTitle>
      <DialogContent sx={{ padding: '10px 10px' }}>
        <EditPicTextField
          value={editPic.url}
          label="* URL"
          onChange={(evt) => {
            const { target: { value } } = evt;
            setEditPic({ ...editPic, url: value });
            return value;
          }}
        />
        <EditPicTextField
          value={editPic.title}
          label="* Title"
          onChange={(evt) => {
            const { target: { value } } = evt;
            setEditPic({ ...editPic, title: value });
            return value;
          }}
        />
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={editPic.comments === 'showCaption'}
                onClick={showHideCaption}
              />
          )}
            label="Show Title In Caption"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <>
          <Button
            disabled={!checkDisabled(editPic)}
            size="small"
            variant="contained"
            className="updatePicButton"
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            onClick={() => { utils.updatePic(editPic, auth, getPictures, setEditPic, setShowTable); }}
          >
            Update

          </Button>
          <Button
            style={{ color: 'red' }}
            size="small"
            className="deletePicButton"
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            onClick={() => { utils.deletePic(editPic, getPictures, auth, setEditPic, setShowTable); }}
          >
            Delete
          </Button>
          <Button
            size="small"
            className="cancelPicButton"
            onClick={() => { setEditPic(defaultPic); }}
          >
            Cancel
          </Button>
        </>
      </DialogActions>
    </Dialog>
  );
}

