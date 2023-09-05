import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { ContentContext } from 'src/providers/Content.provider';
import { Button } from '@mui/material';
import { defaultPic } from './pictures.utils';
import { EditPicDialog } from './EditPicDialog';
import './editPicTable.scss';

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
  setShowTable:(arg0:boolean)=>void
}
export function EditPicTable(props:IeditPicTableProps) {
  const { setShowTable } = props;
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
        onClick={() => setShowTable(false)}
      >
        Cancel
      </Button>
      <DataGrid
        className="rowParams"
        onRowClick={(rowParams) => {
          setEditPic(rowParams.row);
        }}
        rows={[]}
        // rows={[...familyPics, ...otherPics, ...youthPics, ...habitatPics, ...musicPics]}
        columns={columns}
      />
      <EditPicDialog editPic={editPic} setEditPic={setEditPic} setShowTable={setShowTable} />
    </div>
  );
}

interface IeditPictureProps {
  showEditPicTable: boolean, setShowEditPicTable: (arg0:boolean) => void
}
export function EditPicture(props:IeditPictureProps) {
  const {
    showEditPicTable, setShowEditPicTable,
  } = props;
  return (
    <div>
      {!showEditPicTable ? <EditPicTable setShowTable={setShowEditPicTable} /> : null}
    </div>
  );
}
