import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { FlowScreenTemplate } from './flow-screen-template';
import { lightTheme } from '@/theme/styled-theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

describe('FlowScreenTemplate', () => {
  it('renders children in content area', () => {
    renderWithTheme(
      <FlowScreenTemplate>
        <Text>Test content</Text>
      </FlowScreenTemplate>
    );
    expect(screen.getByText('Test content')).toBeOnTheScreen();
  });

  it('renders actions when provided', () => {
    renderWithTheme(
      <FlowScreenTemplate actions={<Text>Action button</Text>}>
        <Text>Content</Text>
      </FlowScreenTemplate>
    );
    expect(screen.getByText('Action button')).toBeOnTheScreen();
  });
});
