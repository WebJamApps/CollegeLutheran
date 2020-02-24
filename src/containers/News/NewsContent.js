import React from 'react';
import PropTypes from 'prop-types';
import ELCALogo from '../../components/elcaLogo';

const pageName = 'news';

const NewsContent = ({ books }) => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div
        className="news-div"
        style={{
          margin: 'auto',
          textAlign: 'center',
          padding: '0',
          marginLeft: '-8px',
        }}
      >
        <iframe
          style={{
            width: '100%',
            height: '540px',
            border: '1px solid #d3d3d3',
          }}
          className="newsIFrame"
          src="https://visitor.r20.constantcontact.com/d.jsp?
            llr=9mgiltbab&p=oi&m=1101234706842&sit=ah8uvihbb&f=f26b8fbd-329c-49ba-b2c2-68eee26dbef1"
          title="News Content"
        >
          <p>Your browser does not support iframe.</p>
        </iframe>
      </div>
      <div>
        {books.length > 0 ? (
          <div className="forumsTable">
            <h3
              style={{
                paddingTop: '22px',
                marginBottom: '8px',
                fontWeight: '100',
                textAlign: 'center',
              }}
            >
              Monthly Forums
            </h3>
            <div className="table-responsive">
              <table className="newsTable">
                <thead>
                  <tr>
                    <th style={{ padding: '8px', width: '230px' }}>Title</th>
                    <th style={{ padding: '8px', width: '105px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((d) => (
                    <tr key={d._id}>
                      <td className="newsUrl">
                        <a rel="noopener noreferrer" target="_blank" href={d.url}>{d.title}</a>
                      </td>
                      <td>{d.created_at.split('T')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>There are currently no pdfs links to display</p>
        )}
      </div>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <ELCALogo pageName={pageName} />
  </div>
);

NewsContent.defaultProps = { books: [] };
NewsContent.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      comments: PropTypes.string,
    }),
  ),
};

export default NewsContent;
