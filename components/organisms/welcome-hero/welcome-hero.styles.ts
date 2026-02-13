import { Pressable, View } from "react-native";
import styled from "styled-components/native";

export const TitleBlock = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const ArrowButton = styled(Pressable)`
  margin-top: 40px;
  padding-vertical: 48px;
  align-items: center;
`;

export const ImageSection = styled.View`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

export const ContentSection = styled.View`
  flex: 1;
  padding-horizontal: 32px;
`;

export const WelcomeHeroContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
