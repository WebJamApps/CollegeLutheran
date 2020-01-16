import React from 'react';

const pageName = 'news';
const NewsContent = () => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <div
          style={{
            margin: 'auto',
            textAlign: 'center',
            padding: '0',
            marginLeft: '-8px',
          }}
        >
          <iframe
            style={{ width: '800px', height: '540px', border: '1px solid #d3d3d3' }}
            className="newsIFrame"
            src="https://visitor.r20.constantcontact.com/d.jsp?llr=9mgiltbab&p=
            oi&m=1101234706842&sit=ah8uvihbb&f=f26b8fbd-329c-49ba-b2c2-68eee26dbef1"
            title="News Content"
          >
            <p>Your browser does not support iframe.</p>
          </iframe>
        </div>
        <div>
          <p>There are currently no pdfs links to display</p>
        </div>
        <div>
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
          <div className="search-table-outer" style={{ position: 'relative', overflowX: 'auto' }}>
            <table aurelia-table="data.bind: books; display-data.bind: $displayData; filters.bind: filters" className="bookshelf">
              <thead>
                <tr>
                  <th style={{ padding: '8px' }} aut-sort="key: title">
                    Title
                  </th>
                  {/* <!-- <th style="padding:8px" aut-sort="key: type">Type</th> --> */}
                  <th style={{ padding: '8px', minWidth: '100px' }} aut-sort="key: created_at; default: desc">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px' }}>
                    <a style={{ fontSize: '11pt' }} href="${book.url}" target="_blank" />
                    <a style={{ fontSize: '11pt' }} href="/dashboard/reader" />
                    <p />
                  </td>
                  {/* <!-- */}
                  {' '}
                  <td style={{ padding: '8px' }} />
                  {' '}
                  {/* --> */}
                  <td style={{ padding: '8px' }}>
$
                    {book.created_at}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>

      <div className={`${pageName}ELCA`}>
        <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
          <img
            id="elcaLogo"
            alt="ELCA LOGO"
            src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
            style={{ width: '350px', paddingTop: '30px', margin: 'auto' }}
          />
        </a>
      </div>
    </div>
  </div>
);
export default NewsContent;
