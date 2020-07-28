import React from 'react';
import PicSlider from '../../components/PicSlider';
import type { YouthProps } from './index';

const YouthContent = ({ youthPics }: YouthProps): JSX.Element => (
  <div className="page-content">
    <div id="youthSlideshowWide" style={{ display: 'flex', flexDirection: 'column' }}>
      {youthPics && youthPics.length > 0 ? (<PicSlider data={youthPics} />) : null}
    </div>
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Youth Ministry</h3>
        <p>
          <span style={{ color: 'rgb(0, 51, 102)' }}>
            <strong>
              <i>&quot;Think of us in this way, as servants of Christ and stewards of God’s mysteries.&quot;</i>
              &nbsp;&nbsp;&nbsp;1 Corinthians 4:1
            </strong>
          </span>
        </p>
        <p>
          Youth ministry (6th- 12th grades) at College Lutheran church focuses on God’s mysteries and serving Christ. We are deeply committed to
          helping students explore and live out their faith. Weekly Sunday school, worship, and youth group, as
          well as annual Virginia Synod youth events challenge our students to think deeply about their religious
          beliefs and build on the foundations of the Christian faith. These gatherings provide dynamic contexts for students to examine how
          real-world issues and religion are intertwined. We believe that when our students are encouraged to think about what they believe and ask
          questions, they develop a stronger faith that can withstand the complexities of the teen years and
          adulthood.
        </p>
        <p>
          <span style={{ color: 'rgb(0, 51, 102)' }}>
            <strong>
              <i>&quot;Faith without works is dead.&quot;</i>
              &nbsp;&nbsp;&nbsp;James 2:17
            </strong>
          </span>
        </p>
        <p>
          Not only do our youth have faith, but they show it at every opportunity! Youth at CLC are lifted up and celebrated as essential members
          in the worship, service, and recreational life of
          the congregation. They assist in worship as acolytes, crucifers, communion assistants, assisting ministers, ushers, greeters,
          coffee hour hosts, and children’s sermon speakers. They serve the community through events such as the CROP
          walk for hunger, Trick or Treat So Others May Eat, Trunk or Treating, Souper Bowl Sunday,
          and environmental initiatives. And, they are always excited about fun youth group events like snowtubing, bowling, and hiking!
          <br />
          <br />
          We invite you to come be part of our active, growing youth ministry program at any or all of our upcoming events.
        </p>
        <section style={{ textAlign: 'left', marginTop: '0' }} />
      </div>
      <div className="youthELCA">
        <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
          <img
            id="elcaLogo"
            alt="ELCA LOGO"
            src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
            style={{ width: '350px', paddingTop: '30px', margin: 'auto' }}
          />
        </a>
      </div>
      <p>&nbsp;</p>
    </div>
  </div>
);

YouthContent.defaultProps = { youthPics: [] };

export default YouthContent;
