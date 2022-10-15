/* eslint-disable max-len */
import ELCALogo from 'src/components/elcaLogo';

const makeThermo = (classString:string, style: React.CSSProperties | undefined) => (
  <div className={classString} style={style}>
    <p style={{
      paddingRight: '6px', textAlign: 'center', marginBottom: '5px', fontSize: '14pt', marginLeft: '12px',
    }}
    >
      <strong>
        <i>
          <a
            style={{ fontSize: '15pt' }}
            href="https://forms.gle/U4DV9SqwKtg4gPQr5"
            rel="noreferrer"
            target="_blank"
          >
            Click
            {' '}
            Here
            {' '}
            to Make Your Statement of Intent
          </a>
        </i>
      </strong>
    </p>
    <img src="https://dl.dropboxusercontent.com/s/hz9i4zkwclpsnv5/fallStewardship.jpg?dl=0" style={{ border: 'solid 1px black' }} alt="" title="" width="240" height="425" />
  </div>
);
const StewardshipContent = (): JSX.Element => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Stewardship</h3>
        {makeThermo('wide-thermo', { float: 'right', textAlign: 'center' })}
        <p>October, 2022</p>
        <p>Dear members and friends of College Lutheran Church,</p>
        <p>
          We are reminded in
          {' '}
          <b>Hebrews 12:28</b>
          {' '}
          that we have received from our Lord
          {' '}
          <i style={{ fontWeight: 'bold' }}><q>A Kingdom that Cannot Be Shaken.</q></i>
          {' '}
          We give thanks for this gift, and for the ways God has been faithful to our congregation. Hebrews goes on to say,
          {' '}
          <q>let us give thanks, by which we offer to God an acceptable worship with reverence and awe.</q>
        </p>
        <p>
          This year&#39;s Stewardship Appeal hopes to follow through on these words from the author of Hebrews. In the weeks ahead, we will praise God for His gifts, and respond in thanks with worship, reverence, and awe. We will also share more about upcoming ministry plans for 2023. Newsletter articles, bulletin inserts, temple talks, letters, and a brochure will inform you of our congregation&#39;s mission for this coming year.
          Together we are on a mission that begins with Word, Sacrament, and Service at the center of our life together. In the year ahead we look to continue in ministry excellence, to increase staffing for multi-generational ministry, and to provide hybrid meeting spaces for educational and planning purposes. Sharing our gifts empowers our congregation to continue forming faith, nurturing disciples, and sending us out in service to the broader community.
          <br />
          <br />
          As part of the Stewardship program this year, you will be invited by letter to consider increasing your offering for the coming year. Please pray about this request and do your best to respond generously as the Lord leads you.
          Then, on Sunday, October 23, we will observe Stewardship Sunday by presenting our pledges and commitments (we call them
          {' '}
          <q>Statements of Intent</q>
          ) during the worship service. You are also welcome to mail your Statement of Intent to the church office or complete our online form.
          People from whom a response has not been received by November 6 will be telephoned to assure everyone has the opportunity to present their offering plan for the coming year.
          <br />
          <br />
          Thank you for being part of this exciting congregation we love. Pray for our common work together as we continue to reach out with the Gospel of Jesus Christ.
          <br />
          <br />
          In His name,
          <br />
          <br />
          Pastor David C. Drebes and Council Chair Garry Lautenschlager
        </p>
        {makeThermo('cell-thermo', { margin: 'auto', textAlign: 'center' })}
      </div>
      <p>&nbsp;</p>
      <ELCALogo />
      <p>&nbsp;</p>
    </div>
  </div>
);
export default StewardshipContent;
