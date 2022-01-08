/* eslint-disable max-len */
import React from 'react';
import ELCALogo from '../../components/elcaLogo';

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
            href="https://forms.gle/5oLTJPPw5eysuyF5A"
            rel="noreferrer"
            target="_blank"
          >
            Click
            {' '}
            Here
            {' '}
            to Make Your Pledge
          </a>
        </i>
      </strong>
    </p>
    <img src="https://dl.dropboxusercontent.com/s/owq01nt0eul3dph/thermo.png?dl=0" style={{ border: 'solid 1px black' }} alt="" title="" width="240" height="425"/>
  </div>
);
const pageName = 'giving';
const StewardshipContent = (): JSX.Element => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Stewardship</h3>
        {makeThermo('wide-thermo', { float: 'right', textAlign: 'center' })}
        <p>
        Happy New Year CLC Stewards!<br/><br/>
We are kicking off our annual investment in ministry program for 2022 titled<br/><strong>"Of One Heart and Soul"</strong> (Acts 4:32).<br/><br/>For the next four Sundays you will be hearing about several ministries of CLC and how they impacted our church and community last year. This year's financial commitment goal is $305,000 and we will be setting up a web page and making available commitment cards soon.
<br/><br/><br/>
Thank you all for your support.
<br/><br/>
Emerson Harvey , Stewardship Chair<br/>
Pastor David Drebes<br/>
Josh Sherman<br/>
Maria Sherman<br/><br/><br/>
        </p>
        {/* <hr />
        <p> */}
          {/* <br />
          Greetings to you during this most remarkable time. It has been an inspiration to see the efforts of our church to continue worship and support activities using a variety of methods. I have felt very much in touch with the church while enjoying the Bible studies, videos and regular online updates. In order to continue the great things that CLC does we are introducing our 2021 investment in ministry plan and theme: &quot;our steps are made firm by the Lord&quot; (Psalm 37:23).
          <br />
          <br />
          Due to the pandemic we have been asked to step back in a manner to protect ourselves and others. At the same time God asks us to step up and continue the work of his church. It&apos;s with this spirit in mind that we present to you our commitment goal of $300,000 for 2021!
          <br />
          <br />
          Thank you for your support and prayers!
          <br />
          <br />
          Emerson Harvey III,
          <br />
          Stewardship Chair */}
        {/* </p> */}
        {makeThermo('cell-thermo', { margin: 'auto', textAlign: 'center' })}
      </div>
      <p>&nbsp;</p>
      <ELCALogo pageName={pageName} />
      <p>&nbsp;</p>
    </div>
  </div>
);
export default StewardshipContent;
