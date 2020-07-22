import React from 'react';

interface IWideFBFeed {
  width?: number;
}

const WideFacebookFeed = ({ width }: IWideFBFeed): JSX.Element => {
  let mb = '32px', mt = '0px';
  if (width && width < 1092) { mb = '0px'; mt = '32px'; }
  return (
    <div className="row" style={{ marginLeft: '10px' }}>
      <div className="col" style={{ maxWidth: '600px', margin: 'auto', paddingRight: '10px' }}>
        <p style={{ textAlign: 'center', fontSize: '10pt', marginTop: '0px' }}>
          <a style={{ fontSize: '10pt' }} href="/calendar">
            <i>View Full Calendar</i>
          </a>
        </p>
        <iframe // eslint-disable-next-line max-len
          src="https://calendar.google.com/calendar/embed?title=College%20Lutheran%20Events%20Calendar&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;mode=AGENDA&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=ra8um2u26p59a2t92lfooq4els%40group.calendar.google.com&amp;color=%23060D5E&amp;ctz=America%2FNew_York"
          style={{ borderWidth: 0 }}
          width="550"
          height="500"
          frameBorder="0"
          scrolling="no"
          title="google-calendar"
        />
      </div>
      <div
        className="col"
        style={{
          width: '600px', margin: 'auto', paddingRight: '10px', paddingLeft: '10px', textAlign: 'center',
        }}
      >
        <p
          id="wideFacebook"
          style={{
            textAlign: 'center', fontSize: '10pt', marginBottom: mb, marginTop: mt,
          }}
        >
          <i>
            Like Us On
            {' '}
            <a style={{ fontSize: '10pt' }} href="https://www.facebook.com/CollegeLutheranChurch/">Facebook</a>
          </i>
        </p>
        <iframe
          className="widescreenHomepage"
          // eslint-disable-next-line max-len
          src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FCollegeLutheranChurch&width=500&height=485&colorscheme=light&show_faces=false&header=true&stream=true&show_border=false"
          width="500"
          height="485"
          style={{ border: 'none', overflow: 'hidden', marginLeft: '-14px' }}
          scrolling="none"
          allow="encrypted-media"
          title="facebook ticker"
        />
      </div>
    </div>
  );
};
WideFacebookFeed.defaultProps = { width: 1004 };

export default WideFacebookFeed;
