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
    <img src="https://dl.dropboxusercontent.com/s/mgky2ohmijidad5/thermo.png?dl=0" style={{ border: 'solid 1px black' }} alt="" title="" width="240" height="425"/>
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
This year, our Stewardship Campaign is celebrating how God's Church is <br/>
<strong>"Of One Heart and Soul!"</strong> (Acts 4:32.)<br/><br/>
On upcoming Sundays, you will hear about several ministries of CLC and how they impacted our church and community last year. You are also invited to pledge your support towards our ministries in 2022. This year's financial commitment goal is $305,000.
<br/><br/><br/>
Thank you all for your support.<br/><br/>
Emerson Harvey , Stewardship Chair<br/>
Pastor David Drebes<br/>  
Josh Sherman<br/>
Maria Sherman<br/><br/><br/><br/>
        </p>
        {makeThermo('cell-thermo', { margin: 'auto', textAlign: 'center' })}
      </div>
      <p>&nbsp;</p>
      <ELCALogo/>
      <p>&nbsp;</p>
    </div>
  </div>
);
export default StewardshipContent;
