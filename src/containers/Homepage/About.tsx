import { useContext, useEffect } from 'react';
import parser from 'html-react-parser';
import { ContentContext } from 'src/providers/Content.provider';
import type { Ibook } from 'src/providers/utils';
import PicSlider from '../../components/PicSlider';

export function shuffle(array: Ibook[]) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    // eslint-disable-next-line sonarjs/pseudo-random
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function PictureSection({
  data, width, homePage,
}: { data: Ibook[], width?: number, homePage?: Ibook }) {
  if (width && width >= 1099) {
    return (
      <div className="col">
        {data && data.length > 0 ? (
          <div
            id="familySlideshowWide"
            style={{
              width: '100%',
              maxWidth: '450px',
              margin: 'auto',
              marginTop: '15px',
              marginBottom: '0px',
              textAlign: 'left',
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <PicSlider data={data} />
          </div>
        ) : (
          <div
            id="slideshow1"
            style={{
              margin: 'auto', marginTop: '15px', marginBottom: '0px', textAlign: 'center', maxWidth: '350px',
            }}
          >
            <img
              style={{
                width: '100%', maxWidth: '350px', display: 'block', margin: 'auto',
              }}
              alt="Luther Rose"
              src="/Lutherrose.svg"
            />
          </div>
        )}
        {homePage?.title ? (
          <h3 style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '4px', fontSize: '16pt' }}>
            {parser(homePage.title)}
          </h3>
        ) : null}
        <section style={{ marginTop: homePage?.title ? '4px' : '10px', textAlign: 'left', marginBottom: '0px' }}>
          {parser(homePage && homePage.comments ? homePage.comments : '')}
        </section>
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
}: IAbout) => {
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
            <div style={{ marginTop: '20px', marginBottom: '20px', fontSize: '18px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                &ldquo;I lift my eyes to the hills&rdquo;: &nbsp; Psalm 121
              </p>
              <p style={{ marginBottom: '16px' }}>
                A visitor to our congregation once spoke those words as he exited the front door of our church.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Welcome to the web site of College Lutheran Church, a congregation of the
                Evangelical Lutheran Church in America (ELCA) in Salem VA., in the heart of the
                beautiful Roanoke Valley of Southwest Virginia. We are a vibrant and growing
                congregation founded in 1852 on the grounds of Roanoke College, by seven early
                visionaries who pledged to provide a word and sacrament ministry&mdash;a Lutheran
                presence&mdash;in this place.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Since our founding, we have sought to proclaim the Gospel and to seek ways to
                carry out our &ldquo;calling&rdquo; to serve people, in our own community and elsewhere. We
                are a servant church. Our web site contains more information on our service times
                and ministries to children, youth and the community at the tabs at the right side of
                the screen.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Wherever you are on your faith journey, are a local, or are visiting our beautiful
                area, you are welcome here. We look forward to seeing you, as we prepare to
                celebrate our 175th anniversary in 2027.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Peace be with you!
              </p>
            </div>
            {width && width >= 1099 ? null : (
              <>
                {homePage?.title ? (
                  <h3 style={{ fontWeight: 'bold', marginTop: '20px', fontSize: '16pt' }}>
                    {parser(homePage.title)}
                  </h3>
                ) : null}
                <section style={{ marginTop: '10px', textAlign: 'left', marginBottom: '15px' }}>
                  {parser(homePage && homePage.comments ? homePage.comments : '')}
                </section>
              </>
            )}
            <p style={{ paddingRight: '15px', marginBottom: '8px', paddingBottom: 0 }}>
              <span style={{ fontSize: '18px' }}>
                {' '}
                <strong>What Else is Happening at CLC?</strong>
              </span>
            </p>
            <p style={{ marginBottom: '0px' }}>
              Click
              {' '}
              <a href="/news">News</a>
              {' '}
              to view or subscribe to our emails.
              Scroll below to view our CLC Events Calendar, and follow us on social media.
            </p>
          </div>
          <PictureSection data={data} width={width} homePage={homePage} />
        </div>
      </div>
    </div>
  );
};
