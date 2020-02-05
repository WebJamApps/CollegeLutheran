import React from 'react';
import ELCALogo from '../../components/elcaLogo';

const pageName = 'giving';

const GivingContent = () => (

  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingTop: '22px', paddingBottom: '15px', fontWeight: '100' }}>Giving</h3>
        <p>
          College Lutheran Church now accepts online gifts through GivePlus and Vanco Payment Services.
          Giving with your credit card is easy. Just complete the form below to support the ministries of CLC with your offering!
        </p>
      </div>
      <p>&nbsp;</p>
      <div style={{
        margin: 'auto', textAlign: 'center', padding: '0', marginLeft: '-15px',
      }}
      >
        <iframe
          className="giving-iframe"
          src="https://gp.vancopayments.com/gpo/#/195e5d99-170c-4f3a-b5eb-e61ff13"
          title="Just Giving"
        >
          <p>Your browser does not support iframe.</p>
        </iframe>
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <ELCALogo pageName={pageName} />
      <p>&nbsp;</p>
    </div>
  </div>
);

export default GivingContent;
