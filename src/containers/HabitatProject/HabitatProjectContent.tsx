import { Grid } from '@mui/material';
import ELCALogo from 'src/components/elcaLogo';
import './habitat.scss';

function HabitatProjectContent():JSX.Element {
  return (
    <div className="page-content">
      <Grid container>
        <div style={{ margin: 'auto' }}>

          <img className="center" src="https://salemfaithbuilds.com/wp-content/uploads/2024/12/image.png" alt="Salem Faith Builds logo" />
          <p style={{ textAlign: 'left' }}>
            This is a cooperative ministry among a number of churches in Salem, Virginia.
            <br />
            Our goal is to sponsor a new home build with Habitat for Humanity in the Roanoke Valley.
          </p>
          <p style={{ textAlign: 'left' }}>Our building site is located at 1622 Melrose Avenue in Roanoke.</p>
          <p style={{ textAlign: 'left' }}>
            Volunteers are needed. Sign up by clicking
            {' '}
            <a href="https://signup.com/go/GfYUYNS" target="_blank" rel="noreferrer">here</a>
          </p>
          <p>
            For more information visit
            {' '}
            <a href="https://salemfaithbuilds.com" target="_blank" rel="noreferrer">salemfaithbuilds.com</a>
          </p>
        </div>
      </Grid>
      <ELCALogo />
    </div>
  );
}
export default HabitatProjectContent;
