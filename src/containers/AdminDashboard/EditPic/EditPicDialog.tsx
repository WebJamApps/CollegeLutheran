import { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import {
  Box,
  Button,
  Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, FormGroup, FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import libUtils from 'src/lib/commonUtils';
import { defaultPic } from '../utils';
import { EditPicTextField } from './EditPicTextField';
import picUtils, { PicDialogBox, fixDropboxUrl } from '../pictures.utils';

function checkDisabled(editPic: typeof defaultPic, imgError: boolean):boolean {
  return !!(editPic.title && editPic.url && !imgError);
}

interface IeditPicDialogProps {
  onClose:() => void,
  editPic: typeof defaultPic, setEditPic: (arg0:typeof defaultPic) => void,
}
export function EditPicDialog({ editPic, setEditPic, onClose }: IeditPicDialogProps) {
  const [imgError, setImgError] = useState(false);
  const { auth } = useContext(AuthContext);
  const { getPictures } = useContext(ContentContext);

  useEffect(() => {
    setImgError(false);
    if (editPic.url && editPic.url.match(/dropbox\.com/i)) {
      const fixed = fixDropboxUrl(editPic.url);
      if (fixed !== editPic.url) {
        setEditPic({ ...editPic, url: fixed });
      }
    }
  }, [editPic, setEditPic]);

  const showHideCaption = libUtils.makeShowHideChecked(setEditPic, editPic, 'showCaption');
  const handleChange = (event: SelectChangeEvent) => {
    const { target: { value } } = event;
    setEditPic({ ...editPic, type: event.target.value });
    return value;
  };
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="editPicDialog"
      open={!!editPic._id}
      onClose={() => setEditPic(defaultPic)}
    >
      <DialogTitle>Edit Picture</DialogTitle>
      <DialogContent sx={{ padding: '10px 10px' }}>
        <EditPicTextField
          value={editPic.url}
          label="* URL"
          onChange={(evt) => {
            const { target: { value } } = evt;
            const fixedValue = fixDropboxUrl(value);
            setEditPic({ ...editPic, url: fixedValue });
            return fixedValue;
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
        {editPic.url && (
          <Box sx={{ marginTop: '15px', textAlign: 'center' }}>
            <Box
              component="img"
              src={editPic.url}
              alt="Thumbnail Preview"
              className="pic-thumbnail-preview"
              onLoad={() => setImgError(false)}
              onError={() => setImgError(true)}
              sx={{
                maxHeight: 150,
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: 1,
                border: '1px solid',
                borderColor: imgError ? 'error.main' : 'divider',
                display: imgError ? 'none' : 'block',
                margin: '0 auto',
              }}
            />
            {imgError && (
              <FormHelperText error className="image-error-message">
                Failed to load image from URL. Please enter a valid image URL.
              </FormHelperText>
            )}
          </Box>
        )}
        <PicDialogBox editPic={editPic} handleChange={handleChange} />
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
            disabled={!checkDisabled(editPic, imgError)}
            size="small"
            variant="contained"
            className="updatePicButton"
            onClick={() => {
              (async () => {
                await picUtils.updatePic(editPic, auth, getPictures, setEditPic, onClose);
              })();
            }}
          >
            Update
          </Button>
          <Button
            sx={{ color: 'error.main' }}
            size="small"
            className="deletePicButton"
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            onClick={() => { picUtils.deletePic(editPic, getPictures, auth, setEditPic, onClose); }}
          >
            Delete
          </Button>
          <Button
            size="small"
            className="cancelPicButton"
            sx={{ color: 'text.secondary' }}
            onClick={() => { setEditPic(defaultPic); }}
          >
            Cancel
          </Button>
        </>
      </DialogActions>
    </Dialog>
  );
}

