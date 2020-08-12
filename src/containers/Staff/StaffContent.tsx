import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { HashLink as Link } from 'react-router-hash-link';
import staffItems from './staffItems.json';
import ELCALogo from '../../components/elcaLogo';

const makeStaff = () => {
  let moreStaff = '';
  for (let i = 0; i < staffItems.staff.length; i += 1) { // eslint-disable-next-line security/detect-object-injection
    moreStaff += `<hr /><section id="${staffItems.staff[i].sectionId}"><h4>${staffItems.staff[i].title}</h4>`;
    // eslint-disable-next-line security/detect-object-injection
    moreStaff += `<img style="width:288px" alt="${staffItems.staff[i].sectionId}" src="${staffItems.staff[i].src}"/>`;
    // eslint-disable-next-line security/detect-object-injection
    moreStaff += `<div style="text-align:left;max-width:8in;margin:auto">${staffItems.staff[i].desc}</div></section>`;
  }
  return ReactHtmlParser(moreStaff);
};

const pageName = 'staff';

const StaffContent = (): JSX.Element => (
  <div className="page-content">
    <div>
      <div className="container-fluid">
        <div style={{ padding: '15px', marginTop: '20px' }}>
          <h3 style={{ paddingBottom: '15px' }}>
            Meet Our Staff
          </h3>
          <p>
            At CLC, our staff is dedicated to serving the spiritual needs of our congregation and
            the greater Body of Christ in Salem, VA and the surrounding communities.
          </p>
          <ul>
            <li style={{ paddingTop: '5px', marginLeft: '-15px' }}>
              Reverend
              {' '}
              <Link to="/staff/#David">David</Link>
              {' '}
              C. Drebes,
              <b> Pastor, </b>
              <a href="mailto:pastordrebes@collegelutheran.org">pastordrebes@collegelutheran.org</a>
            </li>
            <li style={{ paddingTop: '20px', marginLeft: '-15px' }}>
              <Link to="/staff/#Susan">Susan</Link>
              {' '}
              Short, Director of Music,
              {' '}
              <a href="mailto:susanshort@collegelutheran.org">susanshort@collegelutheran.org</a>
            </li>
            <li style={{ paddingTop: '20px', marginLeft: '-15px' }}>
              <Link to="/staff/#Sandi">Sandi</Link>
              {' '}
              Roop, Parish Administrator,
              {' '}
              <a href="mailto:office1@collegelutheran.org">office1@collegelutheran.org</a>
            </li>
            <li style={{ paddingTop: '20px', marginLeft: '-15px' }}>
              <Link to="/staff/#Lawrence">Lawrence</Link>
              {' '}
              Keffer, Sexton
            </li>
            <li style={{ paddingTop: '20px', marginLeft: '-15px' }}>
              <Link to="/staff/#Richard">Richard</Link>
              {' '}
              Hoffman, Financial Administrator
            </li>
          </ul>
        </div>
        <div>
          <hr />
          <section id="David">
            <h4>Rev. David C. Drebes - Pastor</h4>
            <img
              alt="pastor"
              src="https://dl.dropboxusercontent.com/s/p696kqa9ist7ffz/2018.04.02.8896%20David%20Drebes%20%28Color%29.jpg?dl=0"
              className="staffPicture"
            />
            <div className="staffDescription">
              <p>
                The Rev. David C. Drebes came to College Lutheran Church in May of 2018 after serving for seven and half years in
                Shenandoah County, Virginia. He was happy to return to Salem, having graduated from Roanoke College in 2005 with a
                Bachelor of Arts in Religion and Political Science. He earned his Master of Divinity from Princeton Theological Seminary in 2008,
                where he also served as the interim Lutheran Chaplain for Princeton University. After a year as a vicar
                in northern New Jersey, he attended the Lutheran Theological Seminary in
                Philadelphia in 2009-2010. In 2015, he completed his Master of Sacred Theology degree at LTSP.
              </p>
              <p>
                Pastor David’s interests include hiking, kayaking, and writing. He spent formative years working as both a counselor at
                Lutheran summer camps and also as a reporter for city newspapers. Pastor David also serves as the coordinator of
                the Virginia Synod’s Power in the Spirit, an annual conference which gathers people of all ages and experiences for fellowship,
                service, worship, and learning on the campus of Roanoke College.
              </p>
              <p>
                Pastor David enjoys visiting with parishioners and members of the wider community.
                If you have joys or sorrows to share, please be in touch.
              </p>
            </div>
          </section>
          <hr />
          <section id="Susan">
            <h4>Susan Short - Director of Music</h4>
            <img
              alt="susan"
              src="https://dl.dropboxusercontent.com/s/zo01a5oblb0lcw4/susan.jpg?dl=0"
              className="staffPicture"
            />
            <div className="staffDescription">
              <p>
                Susan is a lifelong Lutheran. She was baptized as an infant at Trinity Lutheran Church in Hagerstown, Maryland and confirmed at
                St. Mark’s Lutheran Church in Oakland, Maryland. Prior to moving to Salem and College Lutheran Church in
                2004, she was an active member and musician at Grace Evangelical Lutheran Church in Winchester, Virginia.
              </p>
              <p>
                During Susan’s day job, she serves Virginia Tech as the Associate Vice President for Engagement. In this capacity, she is responsible
                for advancing Virginia Tech&apos;s national leadership position in the areas of outreach and engagement.
                Her leadership team is closely involved in working with communities, colleges, and centers to identify engagement opportunities
                for youth, students, scholars, practicing professional, and community members. Susan provides leadership
                for the Commonwealth Campus Centers, Continuing and Professional Education, Center for Organizational and Technological
                Advancement, Office of Economic Development, and the TRiO programs - Upward Bound and Talent Search.
              </p>
              <p>
                Prior to arriving to Virginia Tech in June 2004 to become the director of the Virginia Tech Roanoke Center, Short served for twenty
                years in various administrative capacities at Lord Fairfax Community College, Middletown, Virginia.
                She received bachelor degrees in music education and music therapy from Shenandoah College and Conservatory of Music, a
                master’s degree in counseling/student personnel from Shippensburg University, and a doctorate of philosophy in
                community college administration from Virginia Tech.
              </p>
              <p>
                Susan is an active member at College Church where she has served on Council, Personnel Ministry Team, Adult Choir, and as
                an assisting minister. She serves as a board and committee member on a number of a national and regional
                organizations including the Engagement Scholarship Consortium, Visit Virginia’s Blue Ridge and Roanoke Blacksburg Technology Council.
                She is a 2005 Leadership Roanoke Valley graduate, a 2009 graduate of Virginia Tech’s Executive
                Development Institute, and a 2013 LEAD Virginia graduate. After 30 years of service, she recently retired as a
                women’s college basketball official. In 2005, Susan became the first female to officiate the boys’ state tournament and
                championship games for the West Virginia Secondary Schools Athletic Association. She was inducted into Shenandoah University’s
                Hall of Fame in October, 2009. Susan and her husband, Jeff, a 4th grade math specialist at Burnt Chimney
                Elementary School (Franklin County) live in Roanoke County. She finds great joy in spending time with her family – Mom Jeanie
                Eberly, son Forrest, daughter-in-law Alyssa, grandchildren Cael, Nora, and Conor. And, Gable Miller Short
                is scheduled to make an arrival in our world mid- to late June!
                {' '}
              </p>
            </div>
          </section>
          {makeStaff()}
          <ELCALogo pageName={pageName} />
        </div>
      </div>
    </div>
  </div>
);

export default StaffContent;
