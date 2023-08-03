import { useState } from 'react';
import { EditNewsDialog } from './EditNewsDialog';
import { defaultNews } from './news.utils';

interface IeditNewsTableProps {
  setShowTable: (arg0:boolean) => void
}

export function EditNewsTable(props:IeditNewsTableProps) {
  const { setShowTable } = props;
  const [editNews, setEditNews] = useState(defaultNews);
  return (
    <div
      className="editNewsTable"
      style={{
        display: 'inlineBlock', margin: 'auto', textAlign: 'center', paddingTop: '10px', height: '60vh',
      }}
    >
      <EditNewsDialog
        editNews={editNews}
        setEditNews={setEditNews}
        setShowTable={setShowTable}
      />
    </div>
  );
}

