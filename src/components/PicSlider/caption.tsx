import type React from 'react';
import { useTheme } from '@mui/material/styles';

export const Caption = (props: { caption?: (React.JSX.Element | string); }): React.JSX.Element => {
  const { caption } = props;
  const theme = useTheme();
  return (
    <div
      className="slider-caption"
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
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
