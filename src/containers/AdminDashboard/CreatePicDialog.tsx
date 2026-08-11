import {
  Box,
  Button,
  Checkbox,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField, FormGroup, FormControlLabel,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import libUtils from 'src/lib/commonUtils';
import utils, { defaultPic } from './utils';
import { PicDialogBox, fixDropboxUrl } from './pictures.utils';

interface IpicTextFieldProps {
  pic: typeof defaultPic,
  label: string, url?:boolean,
  setPic: (arg0: typeof defaultPic) => void
}
export function PicTextField(props: IpicTextFieldProps) {
  const {
    pic, label, url, setPic,
  } = props;
  const field: 'url' | 'title' = url ? 'url' : 'title';
  return (
    <TextField
      id={`${field}-textfield`}
      sx={{ marginTop: '20px' }}
      label={label}
      type="text"
      fullWidth
      // eslint-disable-next-line security/detect-object-injection
      value={pic[field]}
      onChange={(evt) => {
        const { target: { value } } = evt;
        const fixedValue = url ? fixDropboxUrl(value) : value;
        setPic({ ...pic, [field]: fixedValue });
        return fixedValue;
      }}
    />
  );
}

interface IcreatePicDialogProps {
  showEditor: string, onClose: () => void,
}
export function CreatePicDialog({ showEditor, onClose }: IcreatePicDialogProps) {
  const [pic, setPic] = useState(defaultPic);
  const [imgError, setImgError] = useState(false);
  const { auth } = useContext(AuthContext);
  const { getPictures } = useContext(ContentContext);

  useEffect(() => {
    setImgError(false);
  }, [pic.url]);

  const showHideCaption = libUtils.makeShowHideChecked(setPic, pic, 'showCaption');
  const handleChange = (event: SelectChangeEvent) => {
    const { target: { value } } = event;
    setPic({ ...pic, type: event.target.value });
    return value;
  };
  const isFormValid = () => pic.title !== '' && pic.url !== '' && !imgError;
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="createNewPicDialog"
      open={showEditor === 'createPic'}
      onClose={onClose}
    >
      <DialogTitle>Create New Picture</DialogTitle>
      <DialogContent sx={{ padding: '10px 10px' }}>
        <DialogContentText sx={{ marginBottom: '10px' }}>
          Enter all *required fields to create a new picture.
        </DialogContentText>
        <PicTextField url pic={pic} label="* Url" setPic={setPic} />
        <PicTextField pic={pic} label="* Title" setPic={setPic} />
        {pic.url && (
          <Box sx={{ marginTop: '15px', textAlign: 'center' }}>
            <Box
              component="img"
              src={pic.url}
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
        <PicDialogBox pic={pic} handleChange={handleChange} />
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={pic.comments === 'showCaption'}
                onClick={showHideCaption}
              />
                        )}
            label="Show Title In Caption"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          className="createPicButton"
          onClick={async () => { await utils.createPicAPI(getPictures, onClose, pic, auth); }}
          disabled={!isFormValid()}
        >
          Create
        </Button>
        <Button
          size="small"
          className="cancelPicButton"
          sx={{ color: 'text.secondary' }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

