import ELCALogo from 'src/components/elcaLogo';

const StewardshipContent = () => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div
        className="material-content elevation3"
        style={{
          maxWidth: '998px', margin: 'auto', minHeight: '74vh',
        }}
      >
        <h3 style={{ paddingTop: '12px', paddingBottom: '0px', marginBottom: '0px' }}>Stewardship</h3>
        <img
          style={{ float: 'right' }}
          alt="fall stewardship"
          src="https://dl.dropboxusercontent.com/scl/fi/la8fjnoppc97zt1koxsqz/fallStewardship.jpg?rlkey=u60j5qhaq2h21ckytmgb8dqi0&dl=0"
        />
        <i style={{ fontSize: '10pt' }}>
          <a
            style={{ fontSize: '10pt' }}
            href="https://forms.gle/7UC5r6Y4GknFans39"
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>
          {' '}
          to provide your 2026 Statement of Intent.
        </i>
        <p style={{ marginTop: '12px' }}>
          Dear members and friends of College Lutheran Church,
        </p>
        <p>
          This year, our fall Stewardship Appeal will celebrate
          {' '}
          <strong>&quot;A New Creation In Christ&quot;</strong>
          (2 Corinthians 5:17) that we see evident in and through the many ministries of College Lutheran Church.
          God continues to bless us by calling and equipping our church to provide Christ-centered worship,
          neighbor-focused service, and community-building fellowship. We have much to be grateful for as members and friends of CLC!
        </p>
        <p>
          In the weeks ahead you will be hearing more about our ministry plans for
          {' '}
          <strong>2026. </strong>
          Newsletter articles, bulletin inserts, temple talks, letters, and a brochure will
          inform you of our congregation&apos;s mission plans for this coming year.
          Together we are on a mission that begins with Word, Sacrament,
          and Service at the center of our life together. As we look back on recent years,
          our core ministries have grown in incredible ways thanks to God’s blessings
          and the increased generosity of our congregation members.
          Looking ahead to
          {' '}
          <strong>2026</strong>
          {' '}
          means celebrating the journey we have been traveling
          and making sure that our new ministries can continue to meet the needs of our community.
        </p>
        <p>
          As part of the Stewardship program this year, you will be invited to make a
          commitment of financial support for the coming year.
          Please pray about this request and do your best to respond generously as the Lord leads you.
          Then, on
          {' '}
          <strong>Sunday, October 19</strong>
          , we will observe Stewardship Sunday by
          presenting our pledges and commitments (we call them &quot;Statements of Intent&quot;)
          during the worship service. You are also welcome to mail your
          Statement of Intent to the church office, or use our online commitment portal if you prefer.
        </p>
        <p>
          Thank you for being part of this exciting congregation we love.
          Pray for our common work together as we continue to reach out with the Gospel.
        </p>
        <p>
          In His name,
        </p>
        <p style={{ marginBottom: '0px' }}>
          Pastor David Drebes
        </p>
      </div>
      <ELCALogo />
    </div>
  </div>
);
export default StewardshipContent;
