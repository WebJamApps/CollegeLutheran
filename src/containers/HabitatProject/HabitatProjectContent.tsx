import { Grid } from '@material-ui/core';
import React from 'react';
import ELCALogo from '../../components/elcaLogo';
import PicSlider from '../../components/PicSlider';

const images = [{
  _id: '5e7273f7349ad8000410f761',
  title: 'CLC Fellowship',
  url: 'https://dl.dropboxusercontent.com/s/s1n4nxwc4pz3bml/CLC_Fellowship.png?dl=0',
  type: 'habitat', comments: '',
},
{
  _id: '5e7273f7349ad8000410f762',
  title: 'Psalm 127',
  url: 'https://dl.dropboxusercontent.com/s/w4drwppxa9jrcmo/psalm127.jpg?dl=0',
  type: 'habitat', comments: '',
},
]; //'showCaption' displays captions if needed'

const HabitatGridItem = (props: { children: any; }) => {
  const { children } = props;
  return (
    <Grid item xs={12} sm={6} md={4} style={{ paddingInline: '20px' }}>
      {children}
    </Grid>
  );
};

const TeamLeaders = (props: { children: any; }) => {
  const { children } = props;
  return (
    < Grid item container direction='row' >
      <div>
        <p><strong>TEAM LEADERS:</strong></p>
        {children}
      </div>
    </Grid >
  );
};

const Responsibilities = (props: { children: any; }) => {
  const { children } = props;
  return (
    <div>
      {children}
      <strong> RESPONSIBILITIES </strong>
    </div>
  );
};

const AboutProject = () => {
  return (
    <Grid item xs={12} sm={6} md={4} style={{ marginInline: '0', paddingInline: '20px' }}>
      <h3 style={{ marginBottom: '0px', paddingBottom: '16px', paddingTop: '16px', textAlign: 'center' }}>
        CLC Habitat Project
      </h3>
      <p style={{ textAlign: 'left' }}>
        College Lutheran Church has made a commitment of $50,000 to sponsor a home in the
        Roanoke Valley. This is the largest service project undertaken by the members of College
        Lutheran and we are delighted to be underway.
        <br></br>
        Here are some details:
        <ul>
          <li>
            This will be a rebuild project at 1004 Stewart Avenue, SE Roanoke.
          </li>
          <li>
            The existing structure will be gutted with hazardous material being mitigated before
            volunteers are on site.
          </li>
          <li>
            New construction will be added to the rear of the building.
          </li>
          <li>
            A family has yet to be confirmed for this home, but we expect a family will be
            designated in the coming weeks
          </li>
          <li>
            All level of construction skills will be needed. Workdays will probably be Wednesday
            and Saturday, but that may change. We typically work 8:00 – 2:00, but half-time
            participation is welcome.
          </li>
          <li>
            Lunch, water, tools are all provided.
          </li>
        </ul>
      </p>
    </Grid>
  );
};

const VolunteerSignUp = () => {
  return (
    <Grid item xs={12} sm={6} md={4} style={{ paddingInline: '20px' }}>
      <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Volunteer Sign Ups</h4>
      <Grid item container direction='row' justifyContent='center' alignItems='center'>
        <div style={{ maxWidth: '500px' }}>
          <p>
            There will be a total of 42 days for volunteering to support the habitat build.
            For each workday we need to have the following volunteers:
          </p>
          <ul>
            <li>
              10 people for construction work
            </li>
            <li>
              4 people to supply lunch/water
            </li>
            <li>
              1-2 videographers
            </li>
          </ul>
          <p>
            Please
            {' '}
            <a href='https://signup.com/client/invitation2/secure/444699447581390086/false#/invitation' target='_blank'>
            <b>click here</b>
            </a>
            {' '}
            to sign up to voluneer!
          </p>
        </div>
      </Grid>
    </Grid>
  );
};

const SlideShow = () => {
  return (
    <Grid item xs={12} sm={6} md={4} style={{ paddingInline: '20px' }}>
      <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Progression Slideshow</h4>
      <PicSlider data={images} />
      <p style={{ textAlign: 'center' }}>
        For progression videos, please checkout our
        {' '}
        <a href='https://www.youtube.com/channel/UCOra1rXiO-BHzMDNlLd9hFQ/videos' target='_blank' rel="noopener noreferrer">
          YouTube channel
        </a>.
      </p>
    </Grid>
  );
};

const ConstructionInfo = () => {
  return (
    <div>
      <Responsibilities>
        <p>Matt Gart, Mike Preston, and Skip Zubrod</p>
      </Responsibilities>
      <ul>
        <li>
          Schedule workdays
        </li>
        <li>
          Schedule workers
        </li>
        <li>
          Coordinate with site supervisor
        </li>
      </ul>
    </div>
  );
};

const SupportInfo = () => {
  return (
    <div>
      <Responsibilities>
        <p>Lisa Yagle, Kay Westermann, and Karen Zubrod</p>
        <p><strong>Sunday Updaters:</strong></p>
        <p>Roger Holtman, Anita Ungs, and Paul Brummer</p>
        <p><strong>Publicity:</strong></p>
        <p>Gary Lautenschlager</p>
        <p><strong>Web Page:</strong></p>
        <p>Josh Sherman</p>
      </Responsibilities>
      <ul>
        <li>
          Make lunches
        </li>
        <li>
          Provide water
        </li>
        <li>
          Provide safety
        </li>
      </ul>

    </div>
  );
};

const FamilyInfo = () => {
  return (
    <div>
      <Responsibilities><p>Bob and Lu Ann Yates, Ellen Holtman, and Debi Talin</p></Responsibilities>
      <ul>
        <li>Connect with the family</li>
        <li>Provide move-in needs</li>
        <li>Introduce family to CLC</li>
      </ul>
    </div>
  );
};

const HabitatProjectContent = (): JSX.Element => (
  <div className="page-content">
    <Grid container>

      {/* About the Habitat Project Section */}
      <AboutProject />

      {/* Volunteer Sign Ups Section */}
      <VolunteerSignUp />

      {/* Slideshow Section */}
      <SlideShow />

      {/* Construction Team Section */}
      <HabitatGridItem>
        <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Construction Team</h4>
        <TeamLeaders>
          <ConstructionInfo />
        </TeamLeaders>
      </HabitatGridItem>

      {/* Support Team Section */}
      <HabitatGridItem>
        <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Support Team</h4>
        <TeamLeaders>
          <SupportInfo />
        </TeamLeaders>
      </HabitatGridItem>

      {/* Family Team Section */}
      <HabitatGridItem>
        <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Family Team</h4>
        <TeamLeaders>
          <FamilyInfo />
        </TeamLeaders>
      </HabitatGridItem>

    </Grid>
    <ELCALogo />
  </div>
);
export default HabitatProjectContent;
