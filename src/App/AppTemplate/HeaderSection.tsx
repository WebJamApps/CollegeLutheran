export function HeaderSection(): JSX.Element {
  return (
    <div id="header" className="material-header home-header" style={{ backgroundColor: '#244a8bff' }}>
      <div className="headercontent" />
      <div>
        <div
          className="flex-header"
          style={{
            marginLeft: '15px',
            marginTop: '-18px',
            paddingRight: '10px',
            paddingLeft: '10px',
          }}
        >
          <h2 className="header-text" style={{ marginBottom: '-1px', marginTop: '1px', fontSize: '25px' }}>
            <a className="header-text" href="/" style={{ textAlign: 'left', textDecoration: 'none' }}>College Lutheran Church</a>
          </h2>
          <p className="subTitle" style={{ maxWidth: '100%', color: '#f4c00eff' }}>
            We celebrate God&apos;s grace and share His love in Christ!
          </p>
        </div>
      </div>
    </div>
  );
}
