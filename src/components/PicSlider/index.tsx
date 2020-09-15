import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Caption from './caption';
import { Ibook } from '../../redux/mapStoreToProps';

type SettingsType = {
  autoplay: boolean;
  autoplaySpeed: number;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  arrows: boolean;
  fade: boolean;
};

export interface PicSliderProps {
  settings?: SettingsType;
  data: Ibook[];
}
class PicSlider extends Component<PicSliderProps> {
  static defaultProps: { data: [{ url: ''; title: ''; _id: 0 }]; };

  settings: SettingsType;

  constructor(props: Readonly<PicSliderProps>) {
    super(props);
    this.settings = {
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
    };
  }

  /* eslint-disable react/jsx-props-no-spreading */
  render(): JSX.Element {
    const { data } = this.props;
    return (
      <div>
        <Slider {...this.settings}>
          {
            data.map((d: Ibook) => (
              <div key={d._id}>
                <img className="slide-show" src={d.url} alt={d.title} />
                {d.comments === 'showCaption' ? <Caption caption={d.title} /> : null}
              </div>
            ))
          }
        </Slider>
      </div>
    );
  }
}

export default PicSlider;
