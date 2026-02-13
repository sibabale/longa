import styled from 'styled-components/native';

export const Placeholder = styled.View<{ $variant?: 'welcome' | 'driver-rider' }>`
  width: 100%;
  aspect-ratio: 1.1;
  background-color: ${(props) => (props.$variant === 'welcome' ? '#E8F4F8' : '#F0F4F8')};
`;
