import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PicSlider from '../../components/PicSlider';
import { Ibook } from '../../redux/mapStoreToProps';

interface IAbout {
  homeContent?: Ibook;
  width?: number;
  allPics?: Ibook[];
}

const About = ({ homeContent, width, allPics }: IAbout): JSX.Element => (
  <div className="aboutPage">
    <div className="container-fluid" style={{ paddingRight: 0 }}>
      <div className="row">
        <div className="col" style={{ top: '0', maxWidth: '7.35in', paddingRight: '4px' }}>
          <p style={{ marginTop: '40px', marginBottom: '40px', fontSize: '18px' }}>
            College Lutheran Church is located in Southwest Virginia in the beautiful city of Salem, right next to Roanoke, VA.
            The church is situated on College Avenue, within easy walking distance of Roanoke College.
            College Lutheran Church is part of the Evangelical Lutheran Church in America (ELCA).
          </p>
          <h5 style={{ fontWeight: 'bold', marginTop: '35px' }}>{ReactHtmlParser(homeContent && homeContent.title ? homeContent.title : '')}</h5>
          <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>
            {ReactHtmlParser(homeContent && homeContent.comments ? homeContent.comments : '')}
          </section>
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
        {width && width >= 900 && allPics && allPics.length > 0 ? (
          <div
            className="col"
            id="familySlideshowWide"
            style={{
              width: '100%', margin: 'auto', marginTop: '45px', textAlign: 'left', paddingLeft: 0, paddingRight: 0,
            }}
          >
            <PicSlider data={allPics} />
          </div>
        ) : null}
        {width && width >= 900 && allPics && allPics.length === 0 ? (
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

export default About;
