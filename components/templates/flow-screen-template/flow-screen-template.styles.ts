import styled from 'styled-components/native';

export const Screen = styled.View<{ $paddingHorizontal?: number }>`
  flex: 1;
  padding-horizontal: ${(props) => props.$paddingHorizontal ?? 32}px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const IllustrationSection = styled.View<{ $height?: string }>`
  height: ${(props) => props.$height ?? '38%'};
  padding-top: 48px;
`;

export const ContentSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ActionsSection = styled.View`
  padding-bottom: 40px;
`;
