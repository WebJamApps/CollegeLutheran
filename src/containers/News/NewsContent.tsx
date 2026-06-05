import type { Ibook } from 'src/providers/utils';
import {
  useContext, useEffect, useState,
} from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { checkIsAdmin } from 'src/App';
import ELCALogo from 'src/components/elcaLogo';
import { EditNewsDialog } from './EditNewsDialog';
import { defaultNews } from './utilsN';

// Constant Contact's hosted opt-in page. We link to it instead of embedding the
// inline-form widget: the widget was injected by an external script that
// Firefox's Enhanced Tracking Protection blocks (form never rendered), and it
// also raced the SPA route mount. A direct link works in every browser with no
// script, no timing race, and no console errors.
const OPT_IN_URL = 'https://visitor.r20.constantcontact.com/manage/optin?v=001cd950f6ed99253e212302d6c939739';

export function SignUpForEmails() {
  return (
    <a
      className="signup-link"
      href={OPT_IN_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      Sign Up for Email Updates
    </a>
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
