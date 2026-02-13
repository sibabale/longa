import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';

import { DestinationPage } from './destination-page';
import { lightTheme } from '@/theme/styled-theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <NavThemeProvider value={{ dark: false } as never}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NavThemeProvider>
  );
}

describe('DestinationPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the page title', () => {
    renderWithTheme(<DestinationPage />);
    expect(screen.getByText('Where would you like to go?')).toBeOnTheScreen();
  });

  it('renders the search input with placeholder', () => {
    renderWithTheme(<DestinationPage />);
    expect(
      screen.getByPlaceholderText('Destination')
    ).toBeOnTheScreen();
  });

  it('renders the back button', () => {
    renderWithTheme(<DestinationPage />);
    expect(
      screen.getByRole('button', { name: 'Go back' })
    ).toBeOnTheScreen();
  });

  it('renders loading state', () => {
    renderWithTheme(<DestinationPage />);
    expect(screen.getByTestId('destination-page-loading')).toBeOnTheScreen();
  });

  it('back button is pressable', () => {
    renderWithTheme(<DestinationPage />);
    fireEvent.press(screen.getByRole('button', { name: 'Go back' }));
  });

  it('search input accepts text after loading', () => {
    renderWithTheme(<DestinationPage />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const input = screen.getByPlaceholderText('Destination');
    fireEvent.changeText(input, 'Cape Town');
    expect(screen.getByDisplayValue('Cape Town')).toBeOnTheScreen();
  });

  it('renders Next button after loading', () => {
    renderWithTheme(<DestinationPage />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(
      screen.getByRole('button', { name: 'Next' })
    ).toBeOnTheScreen();
  });

  it('Next button is disabled when no suggestion is selected', () => {
    renderWithTheme(<DestinationPage />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('Next button is enabled when a suggestion is selected', () => {
    renderWithTheme(<DestinationPage />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const input = screen.getByPlaceholderText('Destination');
    fireEvent.changeText(input, 'Giants');

    fireEvent.press(
      screen.getByRole('button', {
        name: 'Select Giants, Giants Dugout - Oracle Park',
      })
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton.props.accessibilityState?.disabled).toBe(false);
  });
});
