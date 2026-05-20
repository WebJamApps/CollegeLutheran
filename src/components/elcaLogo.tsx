
const ELCALogo = (): JSX.Element => (
  <div style={{ textAlign: 'center', paddingTop: '30px' }}>
    <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
      <img
        id="elcaLogo"
        alt="ELCA LOGO"
        src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '700px',
          height: 'auto',
          margin: '0 auto',
          background: '#ffffff',
          padding: '20px 28px',
          boxSizing: 'border-box',
        }}
      />
    </a>
  </div>
);

export default ELCALogo;
