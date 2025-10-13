/* eslint-disable max-len */
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
        <h3 style={{ paddingTop: '12px', paddingBottom: '0px', marginBottom: '4px' }}>Stewardship</h3>
        <img
          style={{ float: 'right' }}
          alt="fall stewardship"
          src="https://dl.dropboxusercontent.com/scl/fi/la8fjnoppc97zt1koxsqz/fallStewardship.jpg?rlkey=u60j5qhaq2h21ckytmgb8dqi0&dl=0"
        />
        <i style={{ fontSize: '12pt' }}>
          <a
            style={{ fontSize: '12pt' }}
            href="https://forms.gle/7UC5r6Y4GknFans39"
            target="_blank"
            rel="noreferrer"
          >
            <strong>Click here</strong>
          </a>
          {' '}
          to provide your 2026 Statement of Intent.
        </i>
        <p style={{ marginTop: '10px' }}>
          &quot;So if anyone is in Christ, there is a new creation: everything old has passed away; look, new things have come into being!&quot; (II Corinthians 5:17)
        </p>
        <p>
          As College Lutheran Church, our mission is to celebrate God&apos;s grace and share His love in Christ! We give thanks for the new creation that God the Father works in our hearts through the ministry of His Son and the power of the Holy Spirit. In just this past year, we have continued to gather for faithful worship and we have gone out to serve our neighbors nearby and faraway. Thank you for supporting the ministries of College Lutheran Church!
        </p>
        <p>
          In the year ahead, we hope that you will prayerfully consider how you will continue to support CLC with your gifts of time, talents, and offerings. Some anticipated needs in
          {' '}
          <strong>2026</strong>
          {' '}
          include:
        </p>
        <ul>
          <li>
            Updates to the Fellowship Hall to better fit our meals and programs
            <br />
            — about $10,000 to improve sound, lighting, and video projection.
          </li>
          <li>
            Meeting increased costs related to insurance, utilities, and cost of living
            <br />
            — CLC is a very active congregation all week long! Although this increases expenses, we would not have it any other way!
          </li>
        </ul>
        <p>
          In total, we are hoping for an increase of $390 in weekly giving in
          {' '}
          <strong>2026</strong>
          {' '}
          so that we can fully fund our ministries. Every gift matters and helps us to continue celebrating the work God does in our community and through our community. Please consider how your giving can join with the gifts of members and friends of CLC who will support these ministries in
          {' '}
          <strong>2026</strong>
          !
        </p>
        <p>
          With thanks,
        </p>
        <p style={{ marginBottom: '0px' }}>
          Pastor David Drebes & the Stewardship Team
        </p>
      </div>
      <ELCALogo />
    </div>
  </div>
);
export default StewardshipContent;
