import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { ContentContext } from 'src/providers/Content.provider';
import { Button } from '@mui/material';
import { EditPicDialog } from './EditPicDialog';
import './editPicTable.scss';
import { defaultPic } from '../utils';

export const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 300,
    flex: 1,
    editable: false,
  },
  {
    field: 'url',
    headerName: 'thumbnail',
    width: 300,
    editable: false,
    renderCell: (params: GridRenderCellParams) => {
      const { row: { url } } = params;
      if (!url) return '';
      return <img alt="url" src={url} style={{ width: '200px' }} />;
    },
  },
];
interface IeditPicTableProps {
  onClose:()=>void
}
export function EditPicTable(props:IeditPicTableProps) {
  const { onClose } = props;
  const { pictures } = useContext(ContentContext);
  const {
    familyPics, habitatPics, otherPics, musicPics, youthPics,
  } = pictures;

  const [editPic, setEditPic] = useState(defaultPic);
  return (
    <div
      className="editPicTable"
      style={{
        display: 'inlineBlock', margin: 'auto', textAlign: 'center', paddingTop: '10px', height: '60vh',
      }}
    >
      <span>Select Which Picture to Edit</span>
      <Button
        sx={{ marginLeft: '10px' }}
        size="small"
        variant="outlined"
        className="cancelEditPicButton"
        onClick={onClose}
      >
        Cancel
      </Button>
      <DataGrid
        className="rowParams"
        onRowClick={(rowParams) => {
          setEditPic(rowParams.row);
        }}
        rows={[...familyPics, ...otherPics, ...youthPics, ...habitatPics, ...musicPics]}
        columns={columns}
        getRowId={(row) => row._id}
      />
      <EditPicDialog editPic={editPic} setEditPic={setEditPic} onClose={onClose} />
    </div>
  );
}

