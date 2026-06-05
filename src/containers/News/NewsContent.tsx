import type { Ibook } from 'src/providers/utils';
import {
  useContext, useEffect, useState,
} from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { checkIsAdmin } from 'src/App';
import ELCALogo from 'src/components/elcaLogo';
import { EditNewsDialog } from './EditNewsDialog';
import { defaultNews } from './utilsN';

// Email sign-up is handled by the church office, not an online form. The old
// Constant Contact inline-form widget never worked (Firefox blocked the script,
// it raced the SPA mount, and there is no usable hosted form/URL to link to), so
// we simply ask people to contact the office to be added to the list.
export function SignUpForEmails() {
  return (
    <div className="signup-info">
      <p>
        To join our email list, please contact the church office (Sandi Roop) at
        {' '}
        <a href="tel:+15403894963">(540) 389-4963</a>
        {' '}
        or
        {' '}
        <a href="mailto:office1@collegelutheran.org">office1@collegelutheran.org</a>
        , and she will add you to the distribution list.
      </p>
    </div>
  );
}

interface NewsContentProps {
  books?: Ibook[];
}
export function NewsContent({ books }: NewsContentProps) {
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
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <SignUpForEmails />
        </div>
      </div>
      <EditNewsDialog editNews={editNews} setEditNews={setEditNews} />
      <ELCALogo />
    </div>
  );
}
