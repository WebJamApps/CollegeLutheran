/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Caption from './PicSlider/caption';

class PicSlider extends Component {
  constructor(props) {
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

  render() {
    const { data } = this.props;
    return (
      <div>
        <Slider {...this.settings}>
          {
            data.map((d) => (
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
PicSlider.defaultProps = {
  data: [{ url: '', title: '', _id: 0 }],
};

PicSlider.propTypes = {
  // @ts-ignore
  data: PropTypes.arrayOf(PropTypes.shape),
};

export default PicSlider;
