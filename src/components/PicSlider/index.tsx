import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Caption from './caption';

export interface PicSliderProps {
  settings: any;
  data: any;
  slider?: any;
}
class PicSlider extends Component<PicSliderProps> {
  static defaultProps: { data: [{ url: ''; title: ''; _id: 0 }]; settings: any };

  settings: any;

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
  render() {
    const { data } = this.props;
    return (
      <div>
        <Slider {...this.settings}>
          {
            data.map((d: { _id: string; url: string; title: string; comments: string; }) => (
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
