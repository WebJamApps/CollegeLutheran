import { useContext } from 'react';
import parser from 'html-react-parser';
import ELCALogo from 'src/components/elcaLogo';
import { ContentContext } from 'src/providers/Content.provider';

const EventContent = () => {
  const { content: { eventPage } } = useContext(ContentContext);
  return (
    <div className="page-content">
      <div className="container-fluid">
        <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
        <div
          className="material-content elevation3"
          style={{
            maxWidth: '998px', margin: 'auto', minHeight: '74vh',
          }}
        >
          <h3 style={{ paddingTop: '12px', paddingBottom: '0px', marginBottom: '4px' }}>
            {eventPage?.title || ''}
          </h3>
          {parser(eventPage && eventPage.comments ? eventPage.comments : '')}
        </div>
        <ELCALogo />
      </div>
    </div>
  );
};
export default EventContent;
