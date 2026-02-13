import { Pressable, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 24px;
  padding-top: 8px;
`;

export const BackButton = styled(Pressable)`
  padding: 8px;
  margin-right: 8px;
`;

export const TitleSection = styled.View`
  padding-horizontal: 24px;
  padding-top: 16px;
  margin-bottom: 24px;
`;

export const SubtitleText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.tagline};
  margin-top: 8px;
`;

export const ContentSection = styled.View`
  flex: 1;
  flex-direction: column;
  padding-horizontal: 24px;
`;

export const DateSectionWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DateSection = styled.View`
  align-items: center;
`;

export const InfoSection = styled.View`
  padding-bottom: 24px;
`;

export const DateTimePressable = styled(Pressable)`
  padding-vertical: 12px;
  padding-horizontal: 16px;
`;

export const DateDivider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.skeletonFg};
  margin-vertical: 8px;
`;

export const TermsLink = styled(Pressable)`
  margin-top: 8px;
`;

export const PrimaryActionButton = styled(Pressable)`
  width: 100%;
  background-color: #000000;
  border-radius: 100px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
`;

export const PrimaryActionLabel = styled.Text`
  font-size: 17px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: #ffffff;
`;
