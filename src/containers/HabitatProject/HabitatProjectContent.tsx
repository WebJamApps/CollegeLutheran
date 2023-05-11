import { Grid } from '@mui/material';
import { useContext } from 'react';
import parser from 'html-react-parser';
import { ContentContext } from 'src/providers/Content.provider';
import ELCALogo from 'src/components/elcaLogo';
import PicSlider from 'src/components/PicSlider';

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
    <Grid item container direction="row">
      <div>
        <p><strong>TEAM LEADERS:</strong></p>
        {children}
      </div>
    </Grid>
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
  const { content: { habitatPage } } = useContext(ContentContext);
  return (
    <Grid item xs={12} sm={6} md={4} style={{ marginInline: '0', paddingInline: '20px' }}>
      <h3 style={{
        marginBottom: '0px', paddingBottom: '16px', paddingTop: '16px', textAlign: 'center',
      }}
      >
        CLC Habitat Project
      </h3>
      <div style={{ textAlign: 'left' }}>
        College Lutheran Church has made a commitment of $50,000 to sponsor a home in the
        Roanoke Valley. This is the largest service project undertaken by the members of College
        Lutheran and we are delighted to be underway.
        <br />
        Here are some details:
        <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>
          {parser(habitatPage && habitatPage.comments ? habitatPage.comments : '')}
        </section>
        <p>
          Questions??? Contact
          {' '}
          <a href="mailto:rcrevpaul@gmail.com">rcrevpaul@gmail.com</a>
          {' '}
          or
          {' '}
          <a href="mailto:clchabitatsalem@gmail.com">clchabitatsalem@gmail.com</a>
        </p>
      </div>
    </Grid>
  );
};

const VolunteerSignUp = () => (
  <Grid item xs={12} sm={6} md={4} style={{ paddingInline: '20px' }}>
    <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Volunteer Sign Ups</h4>
    <Grid item container direction="row" justifyContent="center" alignItems="center">
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
          <a href="https://signup.com/client/invitation2/secure/444699447581390086/false#/invitation" target="_blank" rel="noreferrer">
            <b>click here</b>
          </a>
          {' '}
          to sign up to volunteer!
        </p>
      </div>
    </Grid>
  </Grid>
);

export const SlideShow = (): JSX.Element => {
  const { pictures } = useContext(ContentContext);
  const { habitatPics = [] } = pictures;
  return (
    <Grid item xs={12} sm={6} md={4} style={{ paddingInline: '20px' }}>
      <h4 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign: 'center' }}>Progression Slideshow</h4>
      <PicSlider data={habitatPics} />
      <p style={{ textAlign: 'center' }}>
        For progression videos, please checkout our
        {' '}
        <a href="https://www.youtube.com/channel/UCOra1rXiO-BHzMDNlLd9hFQ/videos" target="_blank" rel="noopener noreferrer">
          YouTube channel
        </a>
        .
      </p>
    </Grid>
  );
};

const ConstructionInfo = () => (
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

const SupportInfo = () => (
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

const FamilyInfo = () => (
  <div>
    <Responsibilities><p>Bob and Lu Ann Yates, Ellen Holtman, and Debi Talin</p></Responsibilities>
    <ul>
      <li>Connect with the family</li>
      <li>Provide move-in needs</li>
      <li>Introduce family to CLC</li>
    </ul>
  </div>
);

function HabitatProjectContent():JSX.Element {
  return (
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
}
export default HabitatProjectContent;
