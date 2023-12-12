import type { Ibook } from 'src/providers/utils';
import { useResizeDetector } from 'react-resize-detector';
import {
  useContext, useEffect, useState,
} from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { checkIsAdmin } from 'src/App';
import { Button } from '@mui/material';
import ELCALogo from 'src/components/elcaLogo';
import { EditNewsDialog } from './EditNewsDialog';
import { defaultNews } from './utilsN';

export function SignUpForEmails({ height }:{ height:number }) {
  return (
    <>
      <p style={{ display: 'block', color: 'white' }}>{height}</p>
      {height < 700 ? (
        <Button
          onClick={() => window.location.reload()}
          size="large"
          variant="contained"
        >
          Sign Up for Emails
        </Button>
      ) : null}
      <div className="ctct-inline-form" data-form-id="99081bd2-b1a5-48cd-bb60-8c9aba82c2a4" />
    </>
  );
}

interface NewsContentProps {
  books?: Ibook[];
}
export function NewsContent({ books }: NewsContentProps) {
  const { height, ref } = useResizeDetector();
  const { auth } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editNews, setEditNews] = useState(defaultNews);
  useEffect(() => { checkIsAdmin(auth, setIsAdmin); }, [auth]);
  return (
    <div className="page-content">
      <div>
        <div>
          {books && books.length > 0 ? (
            <div className="forumsTable">
              <h3
                style={{
                  paddingTop: '22px',
                  marginBottom: '8px',
                  textAlign: 'center',
                }}
              >
                News
              </h3>
              <div className="TableStyle-root">
                <div className="TableContainer-root table-responsive">
                  <table className="TableHeader newsTable" aria-label="News Anouncement Table">
                    <thead className="TableHead-root">
                      <tr className="TableRow-root">
                        <th className="TableCell-root TableCell-head StickyHeader newsTitle">Title</th>
                        <th className="TableCell-root TableCell-head StickyHeader" style={{ width: '103px' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody className="TableBody-root">
                      {books && books.map(
                        (d: Ibook) => (
                          <tr
                            className="TableRow-root news"
                            key={d._id}
                            style={{ cursor: isAdmin ? 'pointer' : 'default' }}
                            onClick={() => { if (isAdmin) setEditNews(d); }}
                          >
                            <td className="TableCell-root TableCell-body newsUrl">
                              <a rel="noopener noreferrer" target="_blank" href={d.url}>{d.title}</a>
                            </td>
                            <td className="TableCell-root TableCell-body">
                              {d.created_at ? new Date(d.created_at).toLocaleDateString() : ''}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p>There are currently no pdfs links to display</p>
          )}
        </div>
        <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
        <hr style={{ margin: '0px' }} />
        <div ref={ref} style={{ margin: 'auto', textAlign: 'center', marginTop: '-30px' }}>
          <SignUpForEmails height={height || 100} />
        </div>
      </div>
      <EditNewsDialog editNews={editNews} setEditNews={setEditNews} />
      <ELCALogo />
    </div>
  );
}
