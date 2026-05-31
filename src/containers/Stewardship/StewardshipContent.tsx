/* eslint-disable max-len */
import { useContext } from 'react';
import parser from 'html-react-parser';
import ELCALogo from 'src/components/elcaLogo';
import { ContentContext } from 'src/providers/Content.provider';

// The Title and the graphic are fixed; everything below the image is the
// admin-editable body, managed in the dashboard's Stewardship content editor
// and stored as stewardshipPage.comments. (CollegeLutheran#707)
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
          <h3 style={{ paddingTop: '12px', paddingBottom: '0px', marginBottom: '4px' }}>Stewardship</h3>
          <img
            style={{ float: 'right' }}
            alt="fall stewardship"
            src="https://dl.dropboxusercontent.com/scl/fi/la8fjnoppc97zt1koxsqz/fallStewardship.jpg?rlkey=u60j5qhaq2h21ckytmgb8dqi0&dl=0"
          />
          {parser(stewardshipPage && stewardshipPage.comments ? stewardshipPage.comments : '')}
        </div>
        <ELCALogo />
      </div>
    </div>
  );
};
export default StewardshipContent;
