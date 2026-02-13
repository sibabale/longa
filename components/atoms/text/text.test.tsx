import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Text } from './text';
import { lightTheme } from '@/theme/styled-theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe('Text', () => {
  it('renders children as visible text', () => {
    renderWithTheme(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).toBeOnTheScreen();
  });

  it('renders text with custom styling', () => {
    renderWithTheme(
      <Text fontSize="40px" fontFamily="Jost_700Bold">
        Longa
      </Text>
    );
    expect(screen.getByText('Longa')).toBeOnTheScreen();
  });
});
