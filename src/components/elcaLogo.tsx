
const ELCALogo = (): JSX.Element => (
  <div style={{ textAlign: 'center', padding: '0 16px' }}>
    <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', maxWidth: '100%' }}>
      <img
        id="elcaLogo"
        alt="ELCA LOGO"
        src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
        style={{
          display: 'block', width: '100%', maxWidth: '700px', height: 'auto', paddingTop: '30px', margin: '0 auto',
        }}
      />
    </a>
  </div>
);

export default ELCALogo;
