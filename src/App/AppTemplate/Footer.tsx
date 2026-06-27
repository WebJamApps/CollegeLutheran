
import { useTheme } from '@mui/material/styles';

const footerLinks = () => {
  const links = [
    { href: 'https://www.facebook.com/CollegeLutheranChurch/', name: 'facebook', label: 'Facebook' },
    { href: 'https://www.instagram.com/collegelutheranchurch/', name: 'instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/@collegelutheranchurch/streams', name: 'fa-brands fa-youtube', label: 'YouTube' },
  ];

  return (
    <div className="footer-links" style={{ textAlign: 'center', padding: '6px' }}>
      {
        links.map((link) => (
          <a
            key={link.name}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            style={{ paddingRight: '5px' }}
            href={link.href}
          >
            <span><i className={`fab fa-${link.name}`} /></span>
          </a>
        ))
      }
      <span className="nohover">
        Powered by &nbsp;
      </span>
      <a className="wjllc" target="_blank" rel="noopener noreferrer" href="https://www.web-jam.com">Web Jam LLC</a>
    </div>
  );
};

export const Footer = () => {
  const theme = useTheme();
  return (
    <div
      id="wjfooter"
      className="footer"
      style={{
        marginTop: '20px',
        paddingTop: '20px',
        paddingBottom: '20px',
        bottom: '0',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {footerLinks()}
    </div>
  );
};
