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
            <div className="table-responsive">
              <table className="newsTable">
                <thead>
                  <tr>
                    <th style={{ padding: '8px', width: '230px' }}>Title</th>
                    <th style={{ padding: '8px', width: '110px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {books && books.map(
                    (d: { _id: string | number | undefined; url?: string | undefined; title: React.ReactNode; created_at: string; }) => (
                      <tr key={d._id}>
                        <td className="newsUrl">
                          <a rel="noopener noreferrer" target="_blank" href={d.url}>{d.title}</a>
                        </td>
                        <td>{d.created_at.split('T')[0]}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>There are currently no pdfs links to display</p>
        )}
      </div>
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <hr />
      <div
        className="news-div"
        style={{
          margin: 'auto',
          textAlign: 'center',
          padding: '0',
          marginLeft: '-5px',
          width: '100%',
          overflow: 'hidden',
          marginRight: 0,
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
