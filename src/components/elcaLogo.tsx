import React from 'react';

type ElcaProps = {
  pageName: string;
};

const ELCALogo = ({ pageName }: ElcaProps): JSX.Element => (
  <div className={`${pageName}ELCA`} style={{ textAlign: 'center' }}>
    <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
      <img
        id="elcaLogo"
        alt="ELCA LOGO"
        src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
        style={{
          width: '310px', paddingTop: '30px', margin: 'auto', marginLeft: '-12px',
        }}
      />
    </a>
  </div>
);

export default ELCALogo;
