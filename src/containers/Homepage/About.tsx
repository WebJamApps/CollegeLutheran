import { useContext, useEffect } from 'react';
import parser from 'html-react-parser';
import { ContentContext } from 'src/providers/Content.provider';
import type { Ibook } from 'src/providers/utils';
import PicSlider from '../../components/PicSlider';

export function shuffle(array: Ibook[]) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function PictureSection({ data, width }: { data: Ibook[], width?:number }) {
  if (width && width >= 900 && data && data.length > 0) {
    return (
      <div className="col">
        <div
          id="familySlideshowWide"
          style={{
            width: '100%', margin: 'auto', marginTop: '45px', textAlign: 'left', paddingLeft: 0, paddingRight: 0,
          }}
        >
          <PicSlider data={data} />
        </div>
      </div>
    );
  }
  if (width && width >= 900 && data && data.length === 0) {
    return (
      <div className="col" style={{ padding: '1px', paddingRight: '0' }}>
        <div
          id="slideshow1"
          style={{
            margin: 'auto', marginTop: '40px', textAlign: 'center',
          }}
        >
          <img
            style={{ borderRadius: '50%', width: '100%' }}
            alt="churchBuilding"
            src="https://dl.dropboxusercontent.com/s/8wcnwvc7s9iclj5/clcBuilding.png?dl=0"
          />
        </div>
      </div>
    );
  }
  return <> </>;
}

export interface IAbout {
  width?: number;
}

export const About = ({
  width,
}: IAbout): JSX.Element => {
  const { pictures } = useContext(ContentContext);
  const { content: { homePage }, getContent } = useContext(ContentContext);
  const {
    familyPics = [], musicPics = [], youthPics = [], otherPics = [], habitatPics = [],
  } = pictures;
  const allPics = familyPics.concat(youthPics).concat(habitatPics).concat(otherPics).concat(musicPics);
  const data = shuffle(allPics);
  // eslint-disable-next-line  no-void, react-hooks/exhaustive-deps
  useEffect(() => { void getContent(); }, []);// do not repeatedly call getContent!
  return (
    <div className="aboutPage">
      <div className="container-fluid" style={{ paddingRight: 0 }}>
        <div className="row">
          <div className="col" style={{ top: '0', maxWidth: '7.35in', paddingRight: '4px' }}>
            <p style={{ marginTop: '40px', marginBottom: '40px', fontSize: '18px' }}>
              College Lutheran Church is located in Southwest Virginia in the beautiful city of Salem, right next to Roanoke, VA.
              The church is situated on College Avenue, within easy walking distance of Roanoke College.
              College Lutheran Church is part of the Evangelical Lutheran Church in America (ELCA).
            </p>
            <h5 style={{ fontWeight: 'bold', marginTop: '35px' }}>{parser(homePage && homePage.title ? homePage.title : '')}</h5>
            <section style={{ marginTop: '20px', textAlign: 'left', marginBottom: '35px' }}>
              {parser(homePage && homePage.comments ? homePage.comments : '')}
            </section>
            <p style={{ paddingRight: '15px', marginBottom: '16px', paddingBottom: 0 }}>
              <span style={{ fontSize: '18px' }}>
                {' '}
                <strong>What Else is Happening at CLC?</strong>
              </span>
            </p>
            <p>
              Click
              {' '}
              <a href="/news">News</a>
              {' '}
              to view or subscribe to our emails.
              Scroll below to view our CLC Events Calendar, and follow us on social media.
              <br />
            </p>
          </div>
          <PictureSection data={data} width={width} />
        </div>
      </div>
    </div>
  );
};
