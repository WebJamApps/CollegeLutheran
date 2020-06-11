import React from 'react';
import PropTypes from 'prop-types';

const Caption = (props) => {
  const { caption } = props;
  return (
    <div
      className="slider-caption"
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 0,
        backgroundColor: 'silver',
        marginBottom: 0,
        marginTop: 0,
      }}
    >
      {' '}
      {caption}
      {' '}
    </div>
  );
};

Caption.defaultProps = {
  caption: '',
};

Caption.propTypes = {
  caption: PropTypes.string,
};

export default Caption;
