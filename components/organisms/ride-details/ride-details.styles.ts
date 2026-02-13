import { Pressable, View } from "react-native";
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

export const ButtonContainer = styled.View`
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const DoneButton = styled(Pressable)`
  width: 100%;
  background-color: #000000;
  border-radius: 100px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
`;

export const DoneButtonLabel = styled.Text`
  font-size: 17px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: #ffffff;
`;
