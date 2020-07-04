import React from 'react';

const footerLinks = () => {
  const links = [
    { href: 'href="https://twitter.com/CollegeLutheran"', name: 'twitter' },
    { href: 'https://www.facebook.com/CollegeLutheranChurch/', name: 'facebook' },
    { href: 'https://www.instagram.com/collegelutheranchurch/', name: 'instagram' },
  ];

  return (
    <div style={{ textAlign: 'center', padding: '6px' }}>
      {
        links.map((link) => (
          <a key={Math.random().toString()} target="_blank" rel="noopener noreferrer" style={{ paddingRight: '5px' }} href={link.href}>
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

const Footer = (): JSX.Element => (
  <div
    id="wjfooter"
    className="footer"
    style={{
      marginTop: '20px', paddingTop: '20px', paddingBottom: '20px', bottom: '0',
    }}
  >
    { footerLinks() }
  </div>
);

export default Footer;
