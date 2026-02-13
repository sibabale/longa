import { Pressable, View } from "react-native";
import styled from "styled-components/native";

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

export const ContentSection = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

export const ActionContainer = styled.View`
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const PrimaryActionButton = styled(Pressable)<{ disabled?: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.tagline : "#000000"};
  border-radius: 100px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const PrimaryActionLabel = styled.Text`
  font-size: 17px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: #ffffff;
`;
