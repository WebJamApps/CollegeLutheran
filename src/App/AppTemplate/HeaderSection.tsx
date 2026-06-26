import { useWindowWidth } from 'src/lib/useWindowSize';
import { useTheme } from '@mui/material/styles';
import { ThemeModeSelector } from './ThemeModeSelector';

export function HeaderSection() {
  const width = useWindowWidth();
  const theme = useTheme();
  return (
    <div id="header" className="material-header home-header" style={{ backgroundColor: theme.palette.primary.main }}>
      <div
        className="flex-header"
        style={{
          marginLeft: '15px',
        }}
      >
        <h2
          className="header-text"
          style={{
            marginTop: width && width > 320 ? '10px' : '1px',
            fontSize: width && width > 320 ? '24px' : '16px !important',
          }}
        >
          <a
            className="header-text"
            href="/"
            style={{
              textAlign: 'left',
              textDecoration: 'none',
              fontSize: 'inherit',
            }}
          >
            College Lutheran Church

          </a>
        </h2>
        <p
          className="subTitle"
          style={{
            display: width && width < 260 ? 'none' : 'inline',
            maxWidth: '100%',
            color: theme.palette.secondary.main,
            fontSize: width && width > 450 ? '14px' : '9pt',
          }}
        >
          We celebrate God&apos;s grace and share His love in Christ!
        </p>
      </div>
      <ThemeModeSelector />
    </div>
  );
}
