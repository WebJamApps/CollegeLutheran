import {
  useContext, useLayoutEffect, useRef, useState,
} from 'react';
import { useWindowWidth } from 'src/lib/useWindowSize';
import { useTheme } from '@mui/material/styles';
import { ContentContext } from 'src/providers/Content.provider';

export function getTitleFontSize(width: number): string {
  if (width > 600) return '28px';
  if (width > 450) return '25px';
  if (width > 350) return '22px';
  if (width > 300) return '19px';
  return '16px';
}

export function HeaderSection() {
  const width = useWindowWidth();
  const theme = useTheme();
  const { content } = useContext(ContentContext);
  const headerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [lineFits, setLineFits] = useState(false);
  const [inlineLeft, setInlineLeft] = useState(0);
  const headerLine = content.headerLineContent?.title?.trim() ?? '';

  useLayoutEffect(() => {
    const updatePlacement = () => {
      const header = headerRef.current;
      const copy = copyRef.current;
      const line = lineRef.current;
      if (!header || !copy || !line || width <= 699 || !headerLine) {
        setLineFits(false);
        return;
      }
      const copyRight = copy.getBoundingClientRect().right;
      const rightBoundary = header.getBoundingClientRect().right - 24;
      const lineWidth = line.scrollWidth;
      const fits = rightBoundary - copyRight >= lineWidth + 48;
      setLineFits(fits);
      if (fits) setInlineLeft((copyRight + rightBoundary) / 2 - header.getBoundingClientRect().left);
    };

    updatePlacement();
    const observer = typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver(updatePlacement);
    if (headerRef.current) observer?.observe(headerRef.current);
    if (copyRef.current) observer?.observe(copyRef.current);
    window.addEventListener('resize', updatePlacement);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updatePlacement);
    };
  }, [headerLine, width]);

  const titleFontSize = getTitleFontSize(width);

  return (
    <div
      id="header"
      ref={headerRef}
      className={`material-header home-header${headerLine && !lineFits ? ' has-under-line' : ''}`}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div
        className="flex-header"
        style={{
          marginLeft: '15px',
        }}
      >
        <div className="header-copy" ref={copyRef}>
          <h2
            className="header-text"
            style={{
              marginTop: width && width > 450 ? '8px' : '4px',
              marginBottom: '2px',
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
              fontSize: width && width > 450 ? '16px' : '13px',
            }}
          >
            We celebrate God&apos;s grace and share His love in Christ!
          </p>
        </div>
        {headerLine && (
          <span
            ref={lineRef}
            className={`header-line${lineFits ? ' header-line-inline' : ' header-line-under'}`}
            style={{ color: theme.palette.secondary.main, left: lineFits ? `${inlineLeft}px` : undefined }}
          >
            {headerLine}
          </span>
        )}
      </div>
    </div>
  );
}
