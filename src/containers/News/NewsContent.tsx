import type { Ibook } from 'src/providers/utils';
import ELCALogo from '../../components/elcaLogo';

interface NewsContentProps {
  books?: Ibook[];
}

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
                        <tr className="TableRow-root" key={d._id}>
                          <td className="TableCell-root TableCell-body newsUrl">
                            <a rel="noopener noreferrer" target="_blank" href={d.url}>{d.title}</a>
                          </td>
                          <td className="TableCell-root TableCell-body">{d.created_at ? d.created_at.split('T')[0] : ''}</td>
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
      <div className="ctct-inline-form" data-form-id="99081bd2-b1a5-48cd-bb60-8c9aba82c2a4" />
    </div>
    <ELCALogo />
  </div>
);

NewsContent.defaultProps = { books: [] };

export default NewsContent;
