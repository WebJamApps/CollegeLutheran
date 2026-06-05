import Box from '@mui/material/Box';
import ELCALogo from '../../components/elcaLogo';

function GivingInfo() {
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

function GivingDonation() {
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

export function GivingContent() {
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

      {/* 2. Donation iframe — responsive: fills the available width so the
          Breeze give form fits the viewport (taller on phones where the form
          stacks vertically), instead of being forced to 1000px and pushed
          off-screen on mobile. */}
      <Box sx={{
        width: '100%',
        maxWidth: 1200,
        height: { xs: '1100px', sm: '800px' },
        px: { xs: 1, sm: 0 },
      }}
      >
        <GivingDonation />
      </Box>

      {/* 3. Footer/Logo Section */}
      <Box sx={{ mt: 4 }}>
        <ELCALogo />
      </Box>

    </Box>
  );
}
