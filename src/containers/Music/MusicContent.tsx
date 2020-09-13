import React from 'react';
import PicSlider from '../../components/PicSlider';
import type { MusicProps } from './index';

const MusicContent = ({ musicPics }: MusicProps): JSX.Element => (
  <div className="page-content">
    <div id="musicSlideshowWide" style={{ display: 'flex', flexDirection: 'column' }}>
      {musicPics && musicPics.length > 0 ? (<PicSlider data={musicPics} />) : null}
    </div>
    <div className="container-fluid">
      <div className="material-content elevation3" style={{ maxWidth: '998px', margin: 'auto' }}>
        <h3 style={{ paddingBottom: '15px' }}>Music at College Lutheran</h3>
        <p>
          Music Ministry at College Lutheran involves all members of the congregation as they participate in the hymns, songs, psalms, acclamations,
          and musical responses of the liturgy. There are also members who sing in the choir, play an
          instrument, provide special music at times, or supply names of others within the community to contact as guest musicians.
          We sing and play to the glory of God.
        </p>
        <p>
          Currently, the Adult Choir sings from September through Pentecost Sunday. We warm up and prepare on Sunday mornings before worship and
          practice for about an hour after worship for the upcoming Sundays and festivals. The choir generally has
          one Sunday off a month, which is when guest musicians are invited to join us. Instrumentalists such as guitar, winds, brass, strings,
          often accompany the choir anthem as well. And we especially try to highlight and include our youth
          musicians from CLC and from the community. We are always looking to include new instrumentalists,
          and we also invite any vocalists to join us in the choir.
        </p>
        <p>
          College Lutheran Church is home to 5 octaves of handbells. But we need many hands to make a bell choir possible again so please consider
          this music ministry option. It is helpful if you read music but not necessary; if you enjoy music and
          can count, this could be a wonderful new experience and would bring the bells back to re-sounding joy in
          our church, to the delight of everyone here.
        </p>
        <p>
          The Sunday School children provide a song for us during worship periodically and present the annual Advent/Christmas program in December.
          Music ministry participates in other congregational programs such as Trunk or Treat, carol and hymn
          sings, a sing-along at the parish picnic, etc.
        </p>
      </div>
    </div>
  </div>
);

MusicContent.defaultProps = { musicPics: [] };

export default MusicContent;
