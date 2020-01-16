import React from 'react';
import DefaultNewsTable from './NewsTable';

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
            src="https://visitor.r20.constantcontact.com/d.jsp?
            llr=9mgiltbab&p=oi&m=1101234706842&sit=ah8uvihbb&f=f26b8fbd-329c-49ba-b2c2-68eee26dbef1"
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
          <DefaultNewsTable />
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
