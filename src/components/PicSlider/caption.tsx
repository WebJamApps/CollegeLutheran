import React from 'react';

const Caption = (props: { caption?: (JSX.Element|string); }):JSX.Element => {
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

export default Caption;
