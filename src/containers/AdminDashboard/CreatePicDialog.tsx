import {
  Button, Select,
  Checkbox,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField, FormGroup, FormControlLabel,
  Box, FormControl, InputLabel, SelectChangeEvent, MenuItem,
} from '@mui/material';
import { useState, useContext } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { ContentContext } from 'src/providers/Content.provider';
import utils from './utils';

export const defaultCreatePic = {
  url: '', comments: '', title: '', type: '',
};
export const makeShowHideCaption = (setPic: (arg0: typeof defaultCreatePic) => void, pic: typeof defaultCreatePic) => (evt: any) => {
  const { target: { checked } } = evt;
  const comments = checked ? 'showCaption' : '';
  setPic({ ...pic, comments });
};

interface IpicTextFieldProps {
  pic: typeof defaultCreatePic,
  label: string, url?:boolean,
  setPic: (arg0: typeof defaultCreatePic) => void
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
        setPic({ ...pic, [field]: value });
        return value;
      }}
    />
  );
}

interface IcreatePicDialogProps {
  showDialog: boolean, setShowDialog: (arg0: boolean) => void,
}
export function makeHandle(setShowDialog: (arg0: boolean) => void) {
  return () => setShowDialog(false);
}
export function CreatePicDialog({ showDialog, setShowDialog }: IcreatePicDialogProps) {
  const [pic, setPic] = useState(defaultCreatePic);
  const { auth } = useContext(AuthContext);
  const { getPictures } = useContext(ContentContext);
  const showHideCaption = makeShowHideCaption(setPic, pic);
  const handleChange = (event: SelectChangeEvent) => {
    const { target: { value } } = event;
    setPic({ ...pic, type: event.target.value });
    return value;
  };
  const handle = makeHandle(setShowDialog);
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="createNewPicDialog"
      open={showDialog}
      onClose={handle}
    >
      <DialogTitle>Create New Picture</DialogTitle>
      <DialogContent sx={{ padding: '10px 10px' }}>
        <DialogContentText sx={{ marginBottom: '10px' }}>
          Enter all *required fields to create a new picture.
        </DialogContentText>
        <PicTextField url pic={pic} label="* Url" setPic={setPic} />
        <PicTextField pic={pic} label="* Title" setPic={setPic} />
        <Box sx={{ minWidth: 120, marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pic.type}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value="musicPics">musicPics</MenuItem>
              <MenuItem value="familyPics">familyPics</MenuItem>
              <MenuItem value="youthPics">youthPics</MenuItem>
              <MenuItem value="habitatPics">habitatPics</MenuItem>
              <MenuItem value="otherPics">otherPics</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          onClick={async () => { await utils.createPicAPI(getPictures, setShowDialog, pic, auth); }}
        >
          Create
        </Button>
        <Button
          size="small"
          className="cancelPicButton"
          onClick={handle}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
