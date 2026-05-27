import type React from 'react';

export const Caption = (props: { caption?: (React.JSX.Element | string); }): React.JSX.Element => {
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
