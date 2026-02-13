import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { IllustrationPlaceholder } from './illustration-placeholder';

describe('IllustrationPlaceholder', () => {
  it('renders on screen', () => {
    render(<IllustrationPlaceholder testID="illustration-placeholder" />);
    expect(screen.getByTestId('illustration-placeholder')).toBeOnTheScreen();
  });
});
