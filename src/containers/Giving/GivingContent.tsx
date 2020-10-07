import React from 'react';
import ELCALogo from '../../components/elcaLogo';

const pageName = 'giving';

const GivingContent = (): JSX.Element => (

  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Giving</h3>
        <p>
          Thank you for supporting the ministries of College Lutheran Church through your online giving.
          We now use
          {' '}
          <i>BreezeChMS</i>
          {' '}
          to process online gifts. Giving electronically from your bank account or credit card is easy!
          Just complete the form below to support the ministries of CLC with your offering.
        </p>
        <i>
          Due to technical difficulties, we are transitioning away from our previous online giving processor.
          If you require access to Vanco, click
          {' '}
          <a href="https://gp.vancopayments.com/gpo/#/donateNow/195e5d99-170c-4f3a-b5eb-e61ff13" target="_blank" rel="noreferrer">here</a>
          . For further assistance, email us at
          {' '}
          <a href="mailto:office1@collegelutheran.org">office1@collegelutheran.org</a>
        </i>
      </div>
      <p>&nbsp;</p>
      {/* <div id="breeze_giving_embed" data-subdomain="collegelutheranchurch" /> */}
      <div style={{
        margin: 'auto', textAlign: 'center', padding: '0', width: '100%', marginLeft: '-15px',
      }}
      >
        <iframe
          className="giving-iframe"
          src="https://collegelutheranchurch.breezechms.com/give/online"
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
