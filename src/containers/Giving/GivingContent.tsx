import Box from '@mui/material/Box';
import ELCALogo from '../../components/elcaLogo';

function GivingInfo(): JSX.Element {
  return (
    <div
      className="material-content elevation3"
      style={{
        textAlign: 'left', margin: 'auto', marginLeft: '20px', marginRight: '20px',
      }}
    >
      <h3>
        Giving
      </h3>
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
}

function GivingDonation(): JSX.Element {
  return (
    <iframe
      width="100%"
      height="100%"
      style={{ overflowX: 'scroll' }}
      className="giving-iframe"
      src="https://collegelutheranchurch.breezechms.com/give/online"
      title="Just Giving"
    >
      <p>Your browser does not support iframe.</p>
    </iframe>
  );
}

export function GivingContent(): JSX.Element {
  return (
    // Main wrapper that ensures everything is centered on the page
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // This centers all children horizontally
      py: 3,
    } as const}
    >

      {/* 1. Info Section - Width limited so it looks good on desktop */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <GivingInfo />
      </Box>

      {/* 2. Donation Iframe Wrapper - Handles the horizontal scroll */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200, // Matches your desired content width
          height: '800px',
          overflowX: 'auto', // Forces horizontal scrollbar
          border: '1px solid #eee', // Optional: helps see the scroll area
          '&::-webkit-scrollbar': { height: '10px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
        }}
      >
        {/* This inner Box MUST be wider than the wrapper to trigger the scrollbar */}
        <Box sx={{ minWidth: '1000px', height: '100%' }}>
          <GivingDonation />
        </Box>
      </Box>

      {/* 3. Footer/Logo Section */}
      <Box sx={{ mt: 4 }}>
        <ELCALogo />
      </Box>

    </Box>
  );
}
