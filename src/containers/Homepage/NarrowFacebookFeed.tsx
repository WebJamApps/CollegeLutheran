import { ContentContext } from 'src/providers/Content.provider';
import { useContext } from 'react';
import type { Ibook } from 'src/providers/utils';
import PicSlider from '../../components/PicSlider';
import { shuffle } from './About';

const FacebookIframe = () => (
  <>
    <p style={{
      textAlign: 'center', fontSize: '10pt', marginTop: '10px', marginBottom: 0, paddingBottom: '4px',
    }}
    >
      <i>
        Like Us On
        {' '}
        <a style={{ fontSize: '10pt' }} href="https://www.facebook.com/CollegeLutheranChurch/">Facebook</a>
      </i>
    </p>
    <div style={{ maxWidth: '300px', margin: 'auto', marginBottom: 0 }}>
      <iframe
        title="clc-facebook" /* eslint-disable-next-line max-len */
        src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FCollegeLutheranChurch&width=300&height=500&colorscheme=light&show_faces=false&header=true&stream=true&show_border=false"
        width="300"
        height="300"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media"
      />
    </div>
  </>
);
export function FamilySlideContainer({ data }: { data: Ibook[] }) {
  return (
    <div className="familySlideContainer">
      <div
        id="familySlideshowWide"
        style={{
          display: 'flex', flexDirection: 'column', marginTop: '1px', marginRight: 0,
        }}
      >
        {data && data.length > 0 ? (<PicSlider data={data} />) : null}
      </div>
    </div>
  );
}
export const FacebookFeed = (): JSX.Element => {
  const { pictures } = useContext(ContentContext);
  const {
    familyPics = [], musicPics = [], youthPics = [], otherPics = [], habitatPics = [],
  } = pictures;
  const allPics = familyPics.concat(youthPics).concat(habitatPics).concat(otherPics).concat(musicPics);
  const data = shuffle(allPics);
  return (
    <div className="notWidescreen" style={{ maxWidth: '320px', margin: 'auto' }}>
      <p style={{
        textAlign: 'center', fontSize: '10pt', marginTop: 0, marginBottom: 0, paddingBottom: '2px',
      }}
      >
        <a style={{ fontSize: '10pt' }} href="/calendar">
          <i>View Full Calendar</i>
        </a>
      </p>
      <div style={{ maxWidth: '300px', margin: 'auto', marginBottom: 0 }}>
        <iframe
          title="clc-calendar"/* eslint-disable-next-line max-len */
          src="https://calendar.google.com/calendar/embed?title=College%20Lutheran%20Events%20Calendar&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;mode=AGENDA&amp;height=500&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=ra8um2u26p59a2t92lfooq4els%40group.calendar.google.com&amp;color=%23060D5E&amp;ctz=America%2FNew_York"
          style={{ borderWidth: 0 }}
          width="300"
          height="300"
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <hr />
      <FacebookIframe />
      <hr />
      <p style={{
        textAlign: 'center', fontSize: '10pt', marginTop: '10px', marginBottom: 0, paddingBottom: '4px',
      }}
      >
        {' '}
      </p>
      <FamilySlideContainer data={data} />
    </div>
  );
};
