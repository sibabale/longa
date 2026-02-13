import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';

import { DateTimePage } from './datetime-page';
import { lightTheme } from '@/theme/styled-theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

describe('DateTimePage', () => {
  it('renders the page title without destination when not provided', () => {
    renderWithTheme(<DateTimePage />);
    expect(screen.getByText('When do you want to leave?')).toBeOnTheScreen();
  });

  it('renders the page title with custom destination', () => {
    renderWithTheme(<DateTimePage destinationName="Giants" />);
    expect(
      screen.getByText('When do you want to leave for Giants?')
    ).toBeOnTheScreen();
  });

  it('does not render subtitle when pickupLocation not provided', () => {
    renderWithTheme(<DateTimePage />);
    expect(screen.queryByText(/^From /)).not.toBeOnTheScreen();
  });

  it('renders the subtitle when pickupLocation is provided', () => {
    renderWithTheme(<DateTimePage pickupLocation="Airport" />);
    expect(screen.getByText('From Airport')).toBeOnTheScreen();
  });

  it('renders the back button', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByRole('button', { name: 'Go back' })
    ).toBeOnTheScreen();
  });

  it('renders the Confirm button', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByRole('button', { name: 'Confirm' })
    ).toBeOnTheScreen();
  });

  it('renders the See terms link', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByRole('link', { name: 'See terms' })
    ).toBeOnTheScreen();
  });

  it('renders date and time display buttons', () => {
    renderWithTheme(<DateTimePage />);
    const dateButton = screen.getByRole('button', {
      name: /^Date:/,
    });
    const timeButton = screen.getByRole('button', {
      name: /^Time:/,
    });
    expect(dateButton).toBeOnTheScreen();
    expect(timeButton).toBeOnTheScreen();
  });

  it('renders pickup time flexibility info', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByText(
        'Choose your exact pickup time up to 30 days in advance'
      )
    ).toBeOnTheScreen();
  });

  it('renders wait time info', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByText('Extra wait time included to meet your ride')
    ).toBeOnTheScreen();
  });

  it('renders cancellation policy info', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByText(
        'Cancel at no charge up to 60 minutes in advance'
      )
    ).toBeOnTheScreen();
  });

  it('displays today date by default', () => {
    renderWithTheme(<DateTimePage />);
    const today = new Date();
    const expectedDateStr = today.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    expect(screen.getByText(expectedDateStr)).toBeOnTheScreen();
  });

  it('back button is pressable', () => {
    renderWithTheme(<DateTimePage />);
    fireEvent.press(screen.getByRole('button', { name: 'Go back' }));
  });

  it('Confirm button is pressable', () => {
    renderWithTheme(<DateTimePage />);
    fireEvent.press(screen.getByRole('button', { name: 'Confirm' }));
  });

  it('See terms link is pressable', () => {
    renderWithTheme(<DateTimePage />);
    fireEvent.press(screen.getByRole('link', { name: 'See terms' }));
  });

  it('has stable test IDs for key interactive elements', () => {
    renderWithTheme(<DateTimePage />);
    expect(
      screen.getByTestId('datetime-page-back-button')
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId('datetime-page-date-display')
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId('datetime-page-time-display')
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId('datetime-page-confirm-button')
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId('datetime-page-terms-link')
    ).toBeOnTheScreen();
  });
});
