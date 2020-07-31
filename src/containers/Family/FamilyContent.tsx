import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PicSlider from '../../components/PicSlider';
import ELCALogo from '../../components/elcaLogo';
import type { FamilyProps } from './index';

const pageName = 'family';// eslint-disable-next-line max-len
const additionalContent = '<hr><h5>Resources for Families</h5><p><strong><em>Roots and Wings</em></strong>, a monthly publication of the Virginia Synod that provides suggestions of daily family time activities:<a target="_blank" href="https://www.vasynod.org/ministries/roots-and-wings/">https://www.vasynod.org/ministries/roots-and-wings/</a></p><p><strong>Ideas to bring worship to the home:</strong>&nbsp;<a target="_blank" href="https://www.vasynod.org/wp-content/uploads/2012/11/Worship-in-the-Home.pdf">https://www.vasynod.org/wp-content/uploads/2012/11/Worship-in-the-Home.pdf</a></p><p><strong>Hand Prayer:</strong>&nbsp;<a target="_blank" href="http://www.vibrantfaithathome.org/item/hand-prayers">http://www.vibrantfaithathome.org/item/hand-prayers</a></p>';
const FamilyContent = ({ familyPics }: FamilyProps): JSX.Element => (
  <div className="page-content">
    <div id="familySlideshowWide" style={{ display: 'flex', flexDirection: 'column' }}>
      {familyPics && familyPics.length > 0 ? (<PicSlider data={familyPics} />) : null}
    </div>
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <h3 style={{ paddingBottom: '15px' }}>Children and Families</h3>
        <p>
          <span style={{ color: 'rgb(0, 51, 102)' }}>
            <strong>
              <i>&quot;The members of the body that seem to be weaker are indispensable.&quot;</i>
              &nbsp;&nbsp;&nbsp;1 Corinthians 12:22
            </strong>
          </span>
        </p>
        <p>
          Children are indispensable at College Lutheran Church. The Children and Family Ministry at College Lutheran Church supports kids in
          preschool through 5th grade and their families. Age appropriate Sunday School, monthly meet-ups, and
          seasonal events such as Trunk or Treating, Christmas Programs, Easter Parties, and Vacation Bible School are a few of the ways that
          we familiarize our children with Biblical stories and the power of living in Christian community.
        </p>
        <p>
          Children are also encouraged to be full participants in worship. They may follow along in the bulletin with a parent or use the
          children’s activity bags located outside the doors at the back of the sanctuary. Both the children’s
          sermon
          and the kid’s food offering are special parts of the service designated for kid participation. Additionally, there
          is a Nursery available during worship (located on the 2nd floor), if parents prefer to have their children enjoy a safe
          play zone.
        </p>
        <p>
          We celebrate the milestones of Baptism and First Communion and offer guidance for parents during these momentous events. If you
          would like your child to be baptized or receive First communion, please contact Pastor David at
          {' '}
          <a href="mailto:pastordrebes@collegelutheran.org">pastordrebes@collegelutheran.org</a>
          <br />
          We invite you and your family to come experience a fun, embracing Christian community at any or all of our upcoming events.
        </p>
        <section style={{ textAlign: 'left', marginTop: '0' }}>
          {' '}
          {ReactHtmlParser(additionalContent)}
        </section>
      </div>
      <ELCALogo pageName={pageName} />
    </div>
  </div>
);
FamilyContent.defaultProps = { familyPics: [] };

export default FamilyContent;
