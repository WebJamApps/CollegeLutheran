import { Button } from '@mui/material';
import {
  GridColDef, GridRowsProp,
  GridRenderCellParams, DataGrid,
} from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { ContentContext } from 'src/providers/Content.provider';
import { defaultNews } from './utilsN';
import { EditNewsDialog } from './EditNewsDialog';

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
    headerName: 'link',
    width: 300,
    editable: false,
    renderCell: (params: GridRenderCellParams) => {
      const { row: { url } } = params;
      if (!url) return '';
      return url;
    },
  },
];

interface IeditNewsTableProps {
  setShowTable: (arg0:boolean) => void
}

export function EditNewsTable(props:IeditNewsTableProps) {
  const { setShowTable } = props;
  const { news } = useContext(ContentContext);
  const [editNews, setEditNews] = useState(defaultNews);
  const rows: GridRowsProp = [
    { news },
  ];
  return (
    <div
      className="editNewsTable"
      style={{
        display: 'inlineBlock', margin: 'auto', textAlign: 'center', paddingTop: '10px', height: '60vh',
      }}
    >
      <span>Select Which Link to Edit</span>
      <Button
        sx={{ marginLeft: '10px' }}
        size="small"
        variant="outlined"
        className="cancelEditNewsButton"
        onClick={() => setShowTable(false)}
      >
        Cancel

      </Button>
      <DataGrid
        onRowClick={(rowParams) => {
          setEditNews(rowParams.row);
        }}
        rows={rows}
        columns={columns}
      />
      <EditNewsDialog
        editNews={editNews}
        setEditNews={setEditNews}
        setShowTable={setShowTable}
      />
    </div>
  );
}
