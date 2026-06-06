import type { Ibook } from 'src/providers/utils';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from 'src/providers/Auth.provider';
import { checkIsAdmin } from 'src/App';
import ELCALogo from 'src/components/elcaLogo';
import { EditNewsDialog } from './EditNewsDialog';
import { defaultNews } from './utilsN';

// The email sign-up is a Constant Contact inline form injected by an external
// script (see index.html). Firefox's Enhanced Tracking Protection blocks that
// script, so the div stays empty and no form appears. We can't link a direct
// sign-up URL (we don't have one), so when the form fails to render we show a
// fallback asking people to contact the office. Detection: if the CTCT div is
// still empty a few seconds after mount, the script was blocked/failed.
export function SignUpForEmails() {
  const formRef = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    // Load the Constant Contact widget here, on the only page that has its target
    // div. Loading it globally from index.html made the widget log "Div for inline
    // form ... is missing" on every other page, none of which has a div for it.
    (window as unknown as { _ctct_m?: string })._ctct_m = '01cd950f6ed99253e212302d6c939739';
    if (!document.getElementById('ctctSignupScript')) {
      const s = document.createElement('script');
      s.id = 'ctctSignupScript';
      s.src = 'https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js';
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    }
    const timer = setTimeout(() => {
      if (formRef.current && formRef.current.childElementCount === 0) setUnavailable(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div ref={formRef} className="ctct-inline-form" data-form-id="99081bd2-b1a5-48cd-bb60-8c9aba82c2a4" />
      {unavailable ? (
        <div className="signup-unavailable">
          <p>
            Our email sign-up form isn&rsquo;t available in this browser. To join our
            email list, please contact the church office (Sandi Roop) at
            {' '}
            <a href="tel:+15403894963">(540) 389-4963</a>
            {' '}
            or
            {' '}
            <a href="mailto:office1@collegelutheran.org">office1@collegelutheran.org</a>
            , and she will add you to the distribution list.
          </p>
        </div>
      ) : null}
    </>
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
