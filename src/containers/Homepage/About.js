import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import PicSlider from '../../components/pic-slider';

const About = ({ homeContent, width, allPics }) => (
  <div className="widescreenHomepage">
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{ top: '0', maxWidth: '7.35in', paddingRight: 0 }}>
          <p style={{ marginTop: '40px', marginBottom: '40px', fontSize: '18px' }}>
            College Lutheran Church is located in Southwest Virginia in the beautiful city of Salem, right next to Roanoke, VA.
            The church is situated on College Avenue, within easy walking distance of Roanoke College.
            College Lutheran Church is part of the Evangelical Lutheran Church in America (ELCA).
          </p>
          <h5>Due to COVID-19, All Gatherings at CLC Are Canceled until April 1</h5>
          <p>
            This includes worship services and community groups who use our building. To keep in contact during this uncertain time,
            please sign up for our regular emails at
            {' '}
            <a href="https://www.collegelutheran.org/news" rel="noopener noreferrer" target="_blank">https://www.collegelutheran.org/news</a>
            <br />
            Links to previously sent emails are also on our
            {' '}
            <i>News</i>
            {' '}
            page in the
            {' '}
            <i>Accouncements</i>
            {' '}
            table.
          </p>
          {/* <h5>Join Us for Holy Communion</h5>
          <ul style={{ marginBottom: '10px', paddingTop: 0 }}>
            <li style={{ marginLeft: '-10px', paddingBottom: '4px' }}>Service of Holy Communion, Sunday at 10:00 am</li>
            <li style={{ marginLeft: '-10px', paddingBottom: '4px' }}>Sunday school for all ages begins at 9:00 am</li>
            <li style={{ marginLeft: '-10px', paddingBottom: '4px' }}>Choir rehearses at 9:15 on Sunday mornings</li>
            <li style={{ marginLeft: '-10px' }}>Wednesday Bible study at 11:15 am followed by Holy Communion at 12:15 pm</li>
          </ul> */}
          {/* <p><i>Please join us as we celebrate God’s grace and share His love in Christ</i></p> */}
          <h5 style={{ fontWeight: 'bold', marginTop: '35px' }}>{ReactHtmlParser(homeContent.title)}</h5>
          <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>{ReactHtmlParser(homeContent.comments)}</section>
          <p style={{ paddingRight: '15px', marginBottom: '16px', paddingBottom: 0 }}>
            <span style={{ fontSize: '18px' }}>
              {' '}
              <strong>What Else is Happening at CLC?</strong>
            </span>
          </p>
          <p>
            Click
            {' '}
            <a href="/news">News</a>
            {' '}
            and subscribe to our email announcements or view a copy of our monthly forum.
            Scroll below to view our CLC Events Calendar, and follow us on social media.
            <br />
          </p>
        </div>
        {width >= 900 && allPics.length > 0 ? (
          <div
            className="col"
            id="familySlideshowWide"
            style={{
              width: '100%', margin: 'auto', marginTop: '45px', textAlign: 'left', paddingLeft: 0,
            }}
          >
            <PicSlider data={allPics} />
          </div>
        ) : null}
        {width >= 900 && allPics.length === 0 ? (
          <div className="col" style={{ padding: '1px', paddingRight: '0' }}>
            <div
              id="slideshow1"
              style={{
                margin: 'auto', marginTop: '40px', textAlign: 'center', 
              }}
            >
              <img
                style={{ borderRadius: '50%', width: '100%' }}
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
About.defaultProps = { homeContent: {}, width: 1004, allPics: [] };
About.propTypes = {
  allPics: PropTypes.arrayOf(PropTypes.shape({})),
  width: PropTypes.number,
  homeContent: PropTypes.shape({ title: PropTypes.string, comments: PropTypes.string }),
};
export default About;
