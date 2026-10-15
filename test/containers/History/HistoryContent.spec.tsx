import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeCollegeLutheranTheme } from 'src/App/theme';
import HistoryContent from 'src/containers/History/HistoryContent';

describe('HistoryContent', () => {
  it('renders heading, image, four paragraphs, and ELCA logo in light mode', () => {
    render(
      <ThemeProvider theme={makeCollegeLutheranTheme('light')}>
        <HistoryContent />
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'College Lutheran Church: From 1852 to Today' })).toBeTruthy();

    const image = screen.getByAltText('College Lutheran Church building, aerial view at sunset');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('/clc-building-light.jpg');
    expect(image.className).toContain('history-picture');

    expect(screen.getByText(/College Lutheran Church, a member of the national Evangelical Lutheran Church in America/)).toBeTruthy();
    expect(screen.getByText(/The church is built from medina sandstone quarried locally\./)).toBeTruthy();
    expect(screen.getByText(/adapt the building to the congregation’s needs\./)).toBeTruthy();
    expect(screen.getByText(/First served by temporary pastor, Christopher Baughman/)).toBeTruthy();
    expect(screen.getByText(/Today’s congregational life features an active youth program/)).toBeTruthy();
    expect(screen.getByText(/It is not just seven, anymore\./)).toBeTruthy();

    expect(screen.getByAltText('ELCA LOGO')).toBeTruthy();
  });

  it('renders dark mode image in dark mode', () => {
    render(
      <ThemeProvider theme={makeCollegeLutheranTheme('dark')}>
        <HistoryContent />
      </ThemeProvider>,
    );

    const image = screen.getByAltText('College Lutheran Church building, aerial view at sunset');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('/clc-building-dark.jpg');
  });
});
