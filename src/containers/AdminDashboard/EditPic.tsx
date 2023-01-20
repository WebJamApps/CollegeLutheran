
import React, { Dispatch, useEffect, useState } from 'react';
import superagent from 'superagent';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
// import type { Ipicture, PictureContext } from 'src/Providers/PicsProvider';
import type { Ibook } from '../../redux/mapStoreToProps';
import utils from './utils';

async function editPicAPI(body: any, editPic: any, auth: any, dispatch: Dispatch<unknown>, setPicBody: any): Promise<boolean> {
  if (body.title === '') delete body.title;
  if (body.type === '') body.type = 'otherPics';
  if (body.url === '') delete body.url;
  if (body.comments === '') delete body.comments;
  let r;
  try {
    r = await superagent.put(`${process.env.BackendUrl}/book/${editPic._id}`)
      .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
      .send(body);
  } catch (e) { console.log((e as Error).message); return false; }
  if (r.status === 200) {
    dispatch({ type: 'EDIT_PIC', picData: {} });
    dispatch({ type: 'SHOW_TABLE', showTable: true });
    setPicBody({
      youthName: '', youthURL: '', type: '', comments: '',
    });
    window.location.reload();
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}

function handleCancel(dispatch: Dispatch<unknown>, setPicBody: (arg0: any) => void) {
  dispatch({ type: 'EDIT_PIC', picData: {} });
  dispatch({ type: 'SHOW_TABLE', showTable: true });
  setPicBody({
    title: '', url: '', type: '', comments: '',
  });
}

interface IpicButtonProps {
  editPic: any, setPicBody: (arg0: any) => void, picBody: any, auth: any, dispatch: Dispatch<unknown>
}
const PicButton = (props: IpicButtonProps) => {
  const {
    editPic, setPicBody, picBody, auth, dispatch,
  } = props;
  return (
    <div style={{ marginLeft: '50%', marginTop: '10px' }}>
      {editPic._id ? (
        <button
          style={{ display: 'relative', marginRight: '20px' }}
          type="button"
          id="cancel-edit-pic"
          onClick={() => handleCancel(dispatch, setPicBody)}
        >
          Cancel
        </button>
      ) : null}
      <button
        style={{ display: 'relative' }}
        type="button"
        id="submitPic"
        onClick={
          editPic._id ? () => editPicAPI(picBody, editPic, auth, dispatch, setPicBody) : () => utils.createBook(picBody, auth)
        }
      >
        {editPic._id ? 'Edit ' : 'Add '}
        Pic
      </button>
    </div>
  );
};

interface ImakeDropdownProps {
  editPic: Ibook,
  picBody: any,
  onChange: (arg0: any) => void,
}
function MakeDropdown(props: ImakeDropdownProps): JSX.Element {
  const { editPic, picBody, onChange } = props;
  const value = picBody.type === '' && editPic.type ? editPic.type : picBody.type;
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value || ''}
        label="Category"
        onChange={onChange}
      >
        <MenuItem value="youthPics">Youth Pics</MenuItem>
        <MenuItem value="familyPics">Family Pics</MenuItem>
        <MenuItem value="musicPics">Music Pics</MenuItem>
        <MenuItem value="habitat">Habitat</MenuItem>
        <MenuItem value="otherPics">Other Pics</MenuItem>
      </Select>
    </FormControl>
  );
}

interface IradioButtonsProps {
  editPic: Ibook, comments: string, onChange: (...args: any) => void
}
const RadioButtons = (props: IradioButtonsProps) => {
  const { comments, onChange, editPic } = props;
  let hideCaption = true;
  if (comments === 'showCaption' || (comments === '' && editPic.comments === 'showCaption')) hideCaption = false;
  return (
    <div>
      <label htmlFor="hide-caption" style={{ position: 'relative', display: 'inline-block', width: '130px' }}>
        <input
          id="hide-caption"
          type="radio"
          name="hide-caption"
          value="hideCaption"
          checked={hideCaption}
          onChange={onChange}
          className="form-check-input"
          style={{ minWidth: 0 }}
        />
        Hide Caption
      </label>
      <label htmlFor="show-caption" style={{ position: 'relative', display: 'inline-block', width: '130px' }}>
        <input
          type="radio"
          name="show-caption"
          value="showCaption"
          checked={!hideCaption}
          onChange={onChange}
          className="form-check-input"
          style={{ minWidth: 0 }}
        />
        Show Caption
      </label>
    </div>
  );
};

interface IeditPicProps {
  editPic: Ibook,
  auth: any, dispatch: Dispatch<unknown>
}
export function EditPic(props: IeditPicProps): JSX.Element {
  const { editPic, auth, dispatch } = props;
  const [picBody, setPicBody] = useState({
    title: '', url: '', type: '', comments: '',
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleCancel(dispatch, setPicBody), []);
  return (
    <div
      className="material-content elevation3"
      style={{ maxWidth: '320px', margin: '30px auto' }}
    >
      <h4 className="material-header-h4">
        {editPic._id ? 'Edit ' : 'Add '}
        Pictures
      </h4>
      <form id="picsForm">
        <label htmlFor="Title">
          Picture Title
          <input
            id="Title"
            placeholder={editPic.title}
            value={picBody.title}
            onChange={(evt) => setPicBody({ ...picBody, title: evt.target.value })}
          />
        </label>
        <label htmlFor="URL">
          Image Address
          <input
            style={{ marginBottom: '20px' }}
            id="URL"
            placeholder={editPic.url}
            value={picBody.url}
            onChange={(evt) => setPicBody({ ...picBody, url: evt.target.value })}
          />
        </label>
        <MakeDropdown editPic={editPic} picBody={picBody} onChange={(evt:any) => setPicBody({ ...picBody, type: evt.target.value })} />
        {/* {Forms.makeDropdown('type', 'Category', categoryValue, (evt) => setPicBody({ ...picBody, type: evt.target.value }), options)} */}
        <RadioButtons editPic={editPic} comments={picBody.comments} onChange={(evt: any) => setPicBody({ ...picBody, comments: evt.target.value })} />
        <PicButton editPic={editPic} setPicBody={setPicBody} picBody={picBody} auth={auth} dispatch={dispatch} />
      </form>
    </div>
  );
}

