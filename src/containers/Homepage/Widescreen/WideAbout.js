import React from 'react';
import PropTypes from 'prop-types';

const WideAboutUs = ({ homeContent, width }) => (
  <div className="widescreenHomepage">
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{ top: '0', paddingRight: '6px' }}>
          <p style={{ marginTop: '40px', marginBottom: '40px', fontSize: '18px' }}>
          College Lutheran Church is located in Southwest Virginia in the beautiful city of Salem, right next to Roanoke, VA.
          The church is situated on College Avenue, within easy walking distance of Roanoke College.
          College Lutheran Church is part of the Evangelical Lutheran Church in America (ELCA).
          </p>
          <h5>Join Us for Holy Communion</h5>
          <ul style={{ marginBottom: '10px', paddingTop: 0 }}>
            <li style={{ marginLeft: '-10px', paddingBottom: '4px' }}>Service of Holy Communion, Sunday at 10:00 am</li>
            <li style={{ marginLeft: '-10px', paddingBottom: '4px' }}>Sunday school for all ages begins at 9:00 am</li>
            <li style={{ marginLeft: '-10px', paddingBottom: '4px' }}>Choir rehearses at 9:15 on Sunday mornings</li>
            <li style={{ marginLeft: '-10px' }}>Wednesday Bible study at 11:15 am followed by Holy Communion at 12:15 pm</li>
          </ul>
          <p><i>Please join us as we celebrate God’s grace and share His love in Christ</i></p>
          <div id="custom-content">
            <h5 style={{ fontWeight: 'bold', marginTop: '35px' }}>{homeContent.title}</h5>
            <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>{homeContent.comments}</section>
          </div>
          <p style={{ paddingRight: '15px', marginBottom: '16px', paddingBottom: 0 }}>
            <span style={{ fontSize: '18px' }}>
              {' '}
              <strong>What Else is Happening at CLC?</strong>
            </span>
          </p>
          <p>
            Click
            {' '}
            <a href="/news">News &amp; Forum</a>
            {' '}
            to view a copy of our monthly forum or subscribe to our weekly email announcements.
            Scroll below to view our CLC Events Calendar, and follow us on social media.
            <br />
          </p>
        </div>
        {width >= 1004 ? (
          <div className="col" style={{ padding: '1px', paddingRight: '0' }}>
            <div id="slideshow1" style={{ marginTop: '40px', marginRight: 0, textAlign: 'center' }}>
              <img
                style={{ borderRadius: '50%', width: '80%' }}
                alt="churchBuilding"
                src="https://dl.dropboxusercontent.com/s/8wcnwvc7s9iclj5/clcBuilding.png?dl=0"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);
WideAboutUs.defaultProps = { homeContent: {}, width: 1004 };
WideAboutUs.propTypes = {
  width: PropTypes.number,
  homeContent: PropTypes.shape({
    title: PropTypes.string,
    comments: PropTypes.string,
  }),
};
export default WideAboutUs;
