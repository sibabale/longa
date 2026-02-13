import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Icon } from './icon';

describe('Icon', () => {
  it('renders on screen', () => {
    render(<Icon name="arrow-forward" testID="icon" />);
    expect(screen.getByTestId('icon')).toBeOnTheScreen();
  });
});
