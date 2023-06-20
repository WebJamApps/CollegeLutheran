import ELCALogo from 'src/components/elcaLogo';
import parser from 'html-react-parser';
import { useContext } from 'react';
import { ContentContext } from 'src/providers/Content.provider';

const StewardshipContent = () => {
  const { content: { stewardshipPage } } = useContext(ContentContext);
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
          <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Stewardship</h3>
          <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>
            {parser(stewardshipPage && stewardshipPage.comments ? stewardshipPage.comments : '')}
          </section>
        </div>
        <ELCALogo />
      </div>
    </div>
  );
};
export default StewardshipContent;
