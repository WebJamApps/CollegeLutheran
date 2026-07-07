import { useWindowWidth } from 'src/lib/useWindowSize';
import { useTheme } from '@mui/material/styles';
import { ThemeModeSelector } from './ThemeModeSelector';

export function HeaderSection() {
  const width = useWindowWidth();
  const theme = useTheme();

  let titleFontSize = '18px';
  if (width) {
    if (width > 450) {
      titleFontSize = '25px';
    } else if (width > 320) {
      titleFontSize = '21px';
    }
  }

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
            fontSize: titleFontSize,
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
            fontSize: width && width > 450 ? '15px' : '12px',
          }}
        >
          We celebrate God&apos;s grace and share His love in Christ!
        </p>
      </div>
      <ThemeModeSelector />
    </div>
  );
}
