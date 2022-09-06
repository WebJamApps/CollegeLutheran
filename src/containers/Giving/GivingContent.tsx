import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ELCALogo from '../../components/elcaLogo';

const GivingInfo = ():JSX.Element => {
  return (
    <div className = "material-content elevation3">
      <h3>Giving</h3>
      <p>
        Thank you for supporting the ministries of College Lutheran Church through your online giving.
        We now use
        {' '}
        <i>BreezeChMS</i>
        {' '}
        to process online gifts. Giving electronically from your bank account or credit card is easy! 
        Just complete the form below to support the ministries of CLC with your offering.
      </p>
      <i>
        If you have any questions about online giving, please contact us at (540) 389-4963 or
        {' '}
        <a href="mailto:office1@collegelutheran.org">office1@collegelutheran.org</a>
      </i>
    </div>
  );
};

const GivingDonation = ():JSX.Element => {
  return (
    <iframe width="100%" height="100%"
      overflow-x:scroll
      className="giving-iframe"
      src="https://collegelutheranchurch.breezechms.com/give/online"
      title="Just Giving"
    >
      <p>Your browser does not support iframe.</p>
    </iframe> 
  );
};    

function Item(props: { [x: string]: any; sx: any; }) {
  const { sx, ...other } = props;
  return (
    <Box 
      sx={{
        width: '100%',
        height: '100%',
        p: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '10pt',
        fontWeight: '400',
        overflowX: 'scroll',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export function GivingContent():JSX.Element {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'grid', gridAutoColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        }}
      >
        <Item sx={{ gridRow: '25%', gridColumn: '2' }}><GivingInfo/></Item>
        <Item sx={{ gridRow: '50%', gridColumn: 'span 3' }}><GivingDonation/></Item>
        <Item sx={{ gridRow: '25%', gridColumn: 'span 3' }}><ELCALogo/></Item>
      </Box>
    </div>      
  );
}

