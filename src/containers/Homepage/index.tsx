import commonUtils from 'src/lib/commonUtils';
import { useContext, useEffect } from 'react';
import { ContentContext } from 'src/providers/Content.provider';
import { About, shuffle } from './About';
import WideFacebookFeed from './WideFacebookFeed';
import { FacebookFeed, FamilySlideContainer } from './NarrowFacebookFeed';
import ELCALogo from '../../components/elcaLogo';

export function Homepage({ width }: { width: number }) {
  useEffect(() => commonUtils.setTitleAndScroll('', window.screen.width), []);
  const { pictures } = useContext(ContentContext);
  const {
    familyPics = [], musicPics = [], youthPics = [], otherPics = [], habitatPics = [],
  } = pictures;
  const allPics = familyPics.concat(youthPics).concat(habitatPics).concat(otherPics).concat(musicPics);
  const data = shuffle(allPics);

  return (
    <div>
      {width >= 1099
        ? (
          <div className="page-content">
            <About width={width} />
            <hr style={{ marginTop: 0, marginBottom: '4px' }} />
            <WideFacebookFeed width={width} />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
          </div>
        )
        : (
          <div className="page-content">
            <FamilySlideContainer data={data} />
            <About
              width={width}
            />
            <hr style={{ marginTop: 0, marginBottom: '4px' }} />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            <FacebookFeed />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
          </div>
        )}
      <ELCALogo />
    </div>
  );
}
export default Homepage;

