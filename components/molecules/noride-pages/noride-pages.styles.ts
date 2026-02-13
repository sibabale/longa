import { Pressable, View } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding-vertical: 24px;
`;

export const NotifyButton = styled(Pressable)`
  width: 100%;
  background-color: #000000;
  border-radius: 100px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
`;

export const NotifyButtonLabel = styled.Text`
  font-size: 17px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: #ffffff;
`;
