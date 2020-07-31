import React from 'react';

const CalendarContent = (): JSX.Element => (
  <div className="page-content">
    <div className="container-fluid">
      <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
      <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
        <iframe
          src="https://calendar.google.com/calendar/embed?title=College%20Lutheran%20Events%20Calendar&amp;showTabs=0&amp;showCalendars=0&amp;
          height=900&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=ra8um2u26p59a2t92lfooq4els%40group.calendar.google.com&amp;
          color=%23060D5E&amp;ctz=America%2FNew_York"
          style={{ borderWidth: '0' }}
          width="900"
          height="900"
          frameBorder="0"
          scrolling="no"
          title="Church Calendar"
        />
      </div>
    </div>
  </div>
);

export default CalendarContent;
