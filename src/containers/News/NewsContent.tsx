import React from 'react';
import ELCALogo from '../../components/elcaLogo';
import { Ibook } from '../../redux/mapStoreToProps';

interface NewsContentProps {
  books?: Ibook[];
}

const pageName = 'news';

const NewsContent = ({ books }: NewsContentProps): JSX.Element => (
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
              Announcements
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
                      (d: { _id: string | number | undefined; url?: string | undefined; title: React.ReactNode; created_at: string; }) => (
                        <tr className="TableRow-root" key={d._id}>
                          <td className="TableCell-root TableCell-body newsUrl">
                            <a rel="noopener noreferrer" target="_blank" href={d.url}>{d.title}</a>
                          </td>
                          <td className="TableCell-root TableCell-body">{d.created_at.split('T')[0]}</td>
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
      <div
        className="news-div"
        style={{
          margin: '0px 0px auto -8px',
          textAlign: 'center',
          padding: '0',
          width: '108%',
          overflow: 'hidden',
        }}
      >
        <iframe
          className="newsIFrame"
          style={{
            overflow: 'hidden',
            padding: 0,
            width: '100%',
            height: '540px',
            border: 'none',
          }}
          src="https://visitor.r20.constantcontact.com/d.jsp?
            llr=9mgiltbab&p=oi&m=1101234706842&sit=ah8uvihbb&f=f26b8fbd-329c-49ba-b2c2-68eee26dbef1"
          title="News Content"
        >
          <p>Your browser does not support iframe.</p>
        </iframe>
      </div>
    </div>
    <ELCALogo pageName={pageName} />
  </div>
);

NewsContent.defaultProps = { books: [] };

export default NewsContent;
