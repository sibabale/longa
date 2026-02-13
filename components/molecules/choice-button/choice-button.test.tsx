import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { ChoiceButton } from './choice-button';
import { lightTheme } from '@/theme/styled-theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe('ChoiceButton', () => {
  it('renders label', () => {
    renderWithTheme(
      <ChoiceButton
        icon="drive-eta"
        label="Driver"
        onPress={() => {}}
        accessibilityLabel="I am a driver"
      />
    );
    expect(screen.getByText('Driver')).toBeOnTheScreen();
  });

  it('calls onPress when user presses the button', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <ChoiceButton
        icon="person"
        label="Rider"
        onPress={onPress}
        accessibilityLabel="I am a rider"
      />
    );
    fireEvent.press(screen.getByRole('button', { name: 'I am a rider' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is accessible as a button with label', () => {
    renderWithTheme(
      <ChoiceButton
        icon="home"
        label="Home"
        onPress={() => {}}
        accessibilityLabel="Go home"
      />
    );
    expect(screen.getByRole('button', { name: 'Go home' })).toBeOnTheScreen();
  });
});
