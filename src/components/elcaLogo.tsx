
const ELCALogo = (): JSX.Element => (
  <div style={{ textAlign: 'center', padding: '30px 24px 0' }}>
    <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
      <img
        id="elcaLogo"
        alt="ELCA LOGO"
        src="/elca-logo.png"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          margin: '0 auto',
        }}
      />
    </a>
  </div>
);

export default ELCALogo;
