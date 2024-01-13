import axios from 'axios';
import { Iauth } from 'src/providers/Auth.provider';
import {
  Box, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { ReactNode } from 'react';
import { defaultPic } from './utils';

export async function performAxiosRequest(
  config:any,
  getPictures: () => Promise<void>,
  setEditPic: (arg0: typeof defaultPic) => void,
  setShowTable: (arg0:boolean)=>void,
): Promise<void> {
  try {
    const { status } = await axios.request(config);
    if (status === 200) {
      setEditPic(defaultPic);
      await getPictures();
      setShowTable(false);
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}

async function updatePic(
  editPic: typeof defaultPic,
  auth: Iauth,
  getPictures: () => Promise<void>,
  setEditPic: (arg0:typeof defaultPic) => void,
  setShowTable: (arg0:boolean)=>void,
): Promise<void> {
  const url = `${process.env.BackendUrl}/book/${editPic._id}`;
  const config = {
    url,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
    data: editPic,
  };
  await performAxiosRequest(config, getPictures, setEditPic, setShowTable);
}

async function deletePic(
  editPic: typeof defaultPic,
  getPictures: () => Promise<void>,
  auth: Iauth,
  setEditPic: (arg0: typeof defaultPic) => void,
  setShowTable: (arg0:boolean)=>void,
): Promise<void> {
  const url = `${process.env.BackendUrl}/book/${editPic._id}`;
  const config = {
    url,
    method: 'delete',
    headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
  };
  await performAxiosRequest(config, getPictures, setEditPic, setShowTable);
}

interface IpicDialogBoxProps {
  pic?: typeof defaultPic,
  editPic?: typeof defaultPic,
  handleChange: (SelectChangeEvent: any, child: ReactNode) => void
}

export const PicDialogBox = ({ pic, editPic, handleChange }: IpicDialogBoxProps) => (
  <Box sx={{ minWidth: 120, marginTop: '20px' }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={pic?.type || editPic?.type}
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
);

export default {
  updatePic, deletePic, performAxiosRequest, PicDialogBox,
};
