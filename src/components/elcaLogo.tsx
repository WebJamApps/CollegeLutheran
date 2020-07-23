import React from 'react';

interface IElcaLogo {
  pageName: string;
}

const ELCALogo = ({ pageName }: IElcaLogo): JSX.Element => (
  <div className={`${pageName}ELCA`} style={{ textAlign: 'center' }}>
    <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
      <img
        id="elcaLogo"
        alt="ELCA LOGO"
        src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
        style={{ width: '350px', paddingTop: '30px', margin: 'auto' }}
      />
    </a>
  </div>
);

export default ELCALogo;
