/* eslint-disable max-len */
import React from 'react';
import ELCALogo from '../../components/elcaLogo';

const makeThermo = (classString:string, style:any) => (
  <div className={classString} style={style}>
    <p style={{ paddingRight: '6px', textAlign: 'center', marginBottom: '0px' }}>
      <strong>
        <i>
          Click
          {' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSffntpB3lGbSpqzerLvtnaL1zDZVxOH92HbOAL2CPrFCs8eUQ/viewform"
            rel="noreferrer"
            target="_blank"
          >
            here
          </a>
          {' '}
          to make your pledge
        </i>
      </strong>
    </p>
    <img
      src="https://dl.dropboxusercontent.com/s/owq01nt0eul3dph/thermo.png?dl=0"
      style={{ border: 'solid 1px black' }}
      alt="Pledges+as+of+Nov+4"
      title="Pledges+as+of+Nov+4"
      width="240"
      height="425"
    />
  </div>
);
const pageName = 'giving';
const StewardshipContent = (): JSX.Element => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Stewardship</h3>
        {makeThermo('wide-thermo', { float: 'right', marginRight: '-10px', marginLeft: '10px' })}
        <p>
          I hope you enjoy the approach we&apos;re taking with our stewardship campaign this year. How we give thanks for what God has given us, and how we share the gifts we&apos;ve been given, are yet another thing that&apos;s been complicated by this pandemic. I&apos;ve noticed ways that I&apos;ve had to step back from service I used to offer to God and my neighbor. And yet, there are other ways I&apos;ve been called to step up and serve that I never imagined before!
          That&apos;s why we&apos;ll be considering the theme of &quot;stepping back and stepping up,&quot; remembering all the while that
          <br />
          {' '}
          <strong>
            <i>
              &quot;our steps are made firm by the LORD, when he delights in our way; though we stumble, we shall not fall headlong, for the LORD holds us by the hand&quot;
              <br />
              (Psalm 37:23-24).
            </i>
          </strong>
          <br />
          For this promise, let us give thanks!
          <br />
          <br />
          Pastor David C. Drebes
          <br />
          <br />
        </p>
        <hr />
        <p>
          <br />
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
          Stewardship Chair
        </p>
        {makeThermo('cell-thermo', { margin: 'auto', textAlign: 'center' })}
      </div>
      <p>&nbsp;</p>
      <ELCALogo pageName={pageName} />
      <p>&nbsp;</p>
    </div>
  </div>
);
export default StewardshipContent;
