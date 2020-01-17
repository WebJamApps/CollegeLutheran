import React from 'react';
import PropTypes from 'prop-types';

const ELCALogo = ({ pageName }) => (
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
);

ELCALogo.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default ELCALogo;
