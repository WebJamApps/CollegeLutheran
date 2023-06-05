/* eslint-disable max-len */
import ELCALogo from 'src/components/elcaLogo';
import parser from 'html-react-parser';
import { useContext } from 'react';
import { ContentContext } from 'src/providers/Content.provider';

const makeThermo = (classString:string, style: React.CSSProperties | undefined) => (
  <div className={classString} style={style}>
    <p style={{
      paddingRight: '6px', textAlign: 'center', marginBottom: '5px', fontSize: '14pt', marginLeft: '12px',
    }}
    >
      <strong>
        <i>
          <a
            style={{ fontSize: '15pt' }}
            href="https://forms.gle/U4DV9SqwKtg4gPQr5"
            rel="noreferrer"
            target="_blank"
          >
            Click
            {' '}
            Here
            {' '}
            to Make Your Statement of Intent
          </a>
        </i>
      </strong>
    </p>
    <img src="https://dl.dropboxusercontent.com/s/hz9i4zkwclpsnv5/fallStewardship.jpg?dl=0" style={{ border: 'solid 1px black' }} alt="" title="" width="240" height="425" />
  </div>
);
const StewardshipContent = () => {
  const { content: { stewardshipPage } } = useContext(ContentContext);
  return (
    <div className="page-content">
      <div className="container-fluid">
        <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
        <div className="material-content elevation3" style={{ maxWidth: '998px', paddingBottom: '-80px', margin: 'auto' }}>
          <h3 style={{ paddingTop: '22px', paddingBottom: '15px' }}>Stewardship</h3>
          {makeThermo('wide-thermo', { float: 'right', textAlign: 'center' })}
          <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>
            {parser(stewardshipPage && stewardshipPage.comments ? stewardshipPage.comments : '')}
          </section>
          {makeThermo('cell-thermo', { margin: 'auto', textAlign: 'center' })}
        </div>
        <p>&nbsp;</p>
        <ELCALogo />
        <p>&nbsp;</p>
      </div>
    </div>
  );
};
export default StewardshipContent;
