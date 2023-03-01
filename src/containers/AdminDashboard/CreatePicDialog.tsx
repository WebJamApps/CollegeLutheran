import {
  Button, Select,
  Checkbox,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField, FormGroup, FormControlLabel,
  Box, FormControl, InputLabel, SelectChangeEvent, MenuItem,
} from '@mui/material';
import { useState, useContext } from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { PictureContext } from 'src/providers/Pics.provider';
import utils from './utils';

const defaultCreatePic = {
  url: '', comments: '', title: '', type: '',
};

export const makeShowHideCaption = (setPic: (arg0: typeof defaultCreatePic) => void, pic: typeof defaultCreatePic) => (evt: any) => {
  const { target: { checked } } = evt;
  const comments = checked ? 'showCaption' : '';
  setPic({ ...pic, comments });
};

interface IpicTextFieldProps {
  pic: typeof defaultCreatePic,
  label: string,
  key: 'url' | 'title',
  setPic: (arg0: typeof defaultCreatePic) => void
}
export function PicTextField(props: IpicTextFieldProps) {
  const {
    pic, label, key, setPic,
  } = props;
  return (
    <TextField
      sx={{ marginTop: '20px' }}
      label={label}
      type="text"
      fullWidth
      // eslint-disable-next-line security/detect-object-injection
      value={pic[key]}
      onChange={(evt) => {
        const { target: { value } } = evt;
        setPic({ ...pic, [key]: value });
        return value;
      }}
    />
  );
}

interface IcreatePicDialogProps {
  showDialog: boolean, setShowDialog: (arg0: boolean) => void,
}
export function CreatePicDialog({ showDialog, setShowDialog }: IcreatePicDialogProps) {
  const [pic, setPic] = useState(defaultCreatePic);
  const { auth } = useContext(AuthContext);
  const { getPictures } = useContext(PictureContext);
  const showHideCaption = makeShowHideCaption(setPic, pic);
  const handleChange = (event: SelectChangeEvent) => {
    setPic({ ...pic, type: event.target.value });
  };
  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      className="createNewPicDialog"
      open={showDialog}
      onClose={() => setShowDialog(false)}
    >
      <DialogTitle>Create New Picture</DialogTitle>
      <DialogContent sx={{ padding: '10px 10px' }}>
        <DialogContentText sx={{ marginBottom: '10px' }}>
          Enter all *required fields to create a new picture.
        </DialogContentText>
        <PicTextField key="url" pic={pic} label="* Url" setPic={setPic} />
        <PicTextField key="title" pic={pic} label="* Title" setPic={setPic} />
        <Box sx={{ minWidth: 120, marginTop: '18px' }}>
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
          onClick={() => { utils.createPicAPI(getPictures, setShowDialog, pic, auth); }}
        >
          Create
        </Button>
        <Button
          size="small"
          className="cancelPicButton"
          onClick={() => setShowDialog(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
