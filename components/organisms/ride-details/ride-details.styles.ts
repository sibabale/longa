import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ImageSection = styled.View`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

export const ContentSection = styled.View`
  flex: 1;
  padding-horizontal: 32px;
  padding-top: 48px;
`;

export const TitleSection = styled.View`
  margin-bottom: 24px;
`;
